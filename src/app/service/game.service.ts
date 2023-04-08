import { Injectable, Optional, SkipSelf } from "@angular/core";
import { NGXLogger } from 'ngx-logger';
import { Board, CellClickedEvent } from "src/app/model/board";
import { Cell } from "src/app/model/cell";
import { Game } from "src/app/model/game";
import { GameCollection } from "../collection/game-collection";
import { SelectService } from "./select.service";

/**
 * Provides behavior and simple extractions of intent.
 */
@Injectable()
export class GameService {

  private game: Game | null = null;

  private startTurnCallback = this.onStartTurn.bind(this);
  private cellClickedCallback = this.onCellClicked.bind(this);

  constructor(
    private logger: NGXLogger,
    private selectService: SelectService,
    private gameCollection: GameCollection,
    @Optional() @SkipSelf() service?: GameService) {

    if (service) {
      throw new Error('Singleton violation: GameService');
    }
  }

  startGame(game: Game): void {
    if (this.game != null) {
      throw new Error('Cannot start a game with one already active.');
    }
    this.logger.info(`Starting game: ${game.getId()}`);

    this.game = game;
    this.gameCollection.addCreatedGame(this.game);

    this.selectService.deselect();
    this.selectService.setNotSelectedText('Select a piece to move or attack.');
    this.exitStaging();
    this.game.addEventListener(Game.START_TURN_EVENT, this.startTurnCallback);
    this.game.getBoard().addEventListener(Board.CELL_CLICKED_EVENT, this.cellClickedCallback);

    this.game.start();
  }

  endGame(): void {
    if (this.game == null) {
      return;
    }
    this.exitStaging();
    this.game.removeEventListener(Game.START_TURN_EVENT, this.startTurnCallback);
    this.game.getBoard().removeEventListener(Board.CELL_CLICKED_EVENT, this.cellClickedCallback);
    this.game = null;
  }

  isGameActive(): boolean {
    return this.game != null;
  }

  getGame(): Game {
    // Throws if game hasn't been set.
    return this.game!;
  }

  private getBoard(): Board {
    // Throws if game hasn't been set.
    return this.game!.getBoard();
  }

  onStartTurn(): void {
    this.exitStaging();
    this.selectService.deselect();

    // This part needs to happen after exiting staging in order for
    // a staged piece to be properly reset.
    this.getBoard().clearTurnData();

    // TODO: Animate or indicate what happened at the start of the turn.
    // Allow pieces with start of turn actions to take action.
    for (let cell of this.getBoard().getCells().flat()) {
      if (cell.hasPiece()) {
        cell.getPiece()!.takeStartOfTurnAction();
      }
    }

    // It's possible for a piece to have died with the start of turn action.
    // If it did, we need to check for it and award points.
    this.removeAndAwardForDeadPieces();

    // Clear turn data again in case a piece died.
    // This is because clearTurnData is based on assigning values
    // for isLastPiece
    this.getBoard().setLastPieceData();

    // Now show selected actions to effectively clear things,
    // but nothing should be shown since nothing is selected.
    this.showSelectedActions();
  }

  private onCellClicked(event: Event): void {
    const cell = (event as CellClickedEvent).cell;

    // Nothing was selected before, so just select this cell.
    if (!this.selectService.isCellSelected()) {
      this.selectCell(cell);
      return;
    }

    // Do nothing if you select the same cell.
    if (this.selectService.getSelectedCell()!.equals(cell)) {
      return;
    }

    // If a different cell was clicked, it now depends if we had
    // a selected piece.
    if (!this.selectService.isPieceSelected()) {
      this.selectCell(cell);
      return;
    }
    const piece = this.selectService.getSelectedPiece()!;

    // We clicked a different cell with a selected piece.
    // Now we move the selected piece if it's valid based on its
    // original position.
    if (piece.canMoveOrSprintTo(cell)) {
      // Move the piece.
      piece.moveOrSprintTo(cell);
      // Move selection with the piece.
      this.selectCell(cell);
    } else {
      // The piece cannot move here, so select this cell instead.
      // Also cancel any staged action.
      this.exitStaging();
      this.selectCell(cell);
    }
  }

  private selectCell(cell: Cell) {
    this.selectService.selectCell(cell);
    this.showSelectedActions();
  }

  exitStaging(): void {
    if (!this.selectService.isPieceSelected()) {
      return;
    }
    this.selectService.deselect();
    this.showSelectedActions();
  }

  confirmMove(): void {
    if (!this.selectService.isPieceSelected()) {
      throw new Error('Confirming move without a staged piece.');
    }
    const piece = this.selectService.getSelectedPiece()!;

    // Cancel staging if the piece didn't actually move.
    if (!piece.hasConfirmableMove()) {
      this.exitStaging();
      return;
    }

    // Clear staging for all pieces.
    this.getBoard().clearStagedAttackData();

    // Confirm the move, then exit staging for the next action.
    piece.confirmMove();
    this.exitStaging();

    // Potentially award points and check for win condition.
    this.removeAndAwardForDeadPieces();
  }

  confirmAttack(): void {
    if (!this.selectService.isPieceSelected()) {
      throw new Error('Confirming attack without a staged piece.');
    }
    const piece = this.selectService.getSelectedPiece()!;

    if (!piece.hasConfirmableAttack()) {
      // There's nothing to attack, so just cancel.
      this.exitStaging();
      return;
    }

    // Clear staging for all pieces.
    this.getBoard().clearStagedAttackData();

    // Perform the attack.
    piece.attack();
    this.exitStaging();

    // Potentially award points and check for win condition.
    this.removeAndAwardForDeadPieces();
  }

  showSelectedActions() {
    // Reset the state of the board before showing new actions.
    for (let cell of this.getBoard().getCells().flat()) {
      cell.clearIndicators();
      if (cell.hasPiece()) {
        cell.getPiece()!.clearStagedAttackData();
        cell.getPiece()!.stageAction();
      }
    }

    // No piece selected, means no actions need to be shown.
    if (!this.selectService.isPieceSelected()) {
      return;
    }
    const selectedPiece = this.selectService.getSelectedPiece()!;

    // Show available moves.
    if (selectedPiece.canMove()) {
      const moveCells = selectedPiece.getMoveCells();
      for (let cell of moveCells.getMoveableCells()) {
        cell.availableMove = true;
        if (selectedPiece.position.equals(cell.position)) {
          cell.availableMoveStarting = true;
        }
      }
      for (let cell of moveCells.getSprintableCells()) {
        cell.availableSprint = true;
      }
    }

    // Show available attack, if any.
    if (selectedPiece.canAttack()) {
      // Highlight all the cells for which an attack could be made.
      const attackCells = selectedPiece.getAttackCells();
      // TODO: UI is using piece presence to distinguish targets.
      //       This needs to be explicit state set on the cell instead.
      for (let cell of attackCells.toAttack) {
        cell.willBeAttacked = true;
      }
      for (let cell of attackCells.inRange) {
        cell.inAttackRange = true;
      }
      const finishingCell = attackCells.getFinishingCell();
      if (finishingCell) {
        finishingCell.whereAttackWillEnd = true;
      }
      // Since we are staged, this will show the impact of an attack made
      // with the selected piece.
      selectedPiece.attack();
    }
  }

  private removeAndAwardForDeadPieces(): void {
    for (let cell of this.getBoard().getCells().flat()) {
      if (cell.hasPiece()) {
        const piece = cell.getPiece()!;
        if (piece.isDead()) {
          piece.getPlayer().removePiece(piece);
          this.game!.getOtherPlayer(piece.getPlayer()).addPoints(piece.points);
          cell.clearPiece();
        }
      }
    }
    this.game!.checkWinCondition();
  }
}
