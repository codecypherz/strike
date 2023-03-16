import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Cell } from "./cell";
import { GameService } from "./game.service";
import { Piece } from "./piece/piece";
import { TurnService } from "./turn.service";

/**
 * Provides behavior and simple extractions of intent.
 */
@Injectable()
export class BoardService {

  private selectedCell: Cell | null = null;
  private selectedPiece: Piece | null = null;

  constructor(
    private board: Board,
    private turnService: TurnService,
    private gameService: GameService,
    @Optional() @SkipSelf() service?: BoardService) {

    if (service) {
      throw new Error('Singleton violation: BoardService');
    }

    turnService.addEventListener(TurnService.START_TURN_EVENT, this.onStartTurn.bind(this));

    (window as any).boardService = this;

    // TODO: Move this to the UI.
    this.turnService.startGame();
  }

  reset(): void {
    this.exitStaging();
    this.board.reset();
  }

  onStartTurn(): void {
    this.exitStaging();
    this.selectedCell = null;
    this.selectedPiece = null;
    
    // This part needs to happen after exiting staging in order for
    // a staged piece to be properly reset.
    this.board.clearTurnData();
    
    // TODO: Animate or indicate what happened at the start of the turn.
    // Allow pieces with start of turn actions to take action.
    for (let cell of this.board.getCells().flat()) {
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
    this.board.clearTurnData();

    // Now show selected actions to effectively clear things,
    // but nothing should be shown since nothing is selected.
    this.showSelectedActions();
  }

  onCellClicked(cell: Cell): void {
    if (!cell) {
      throw new Error('No cell was clicked');
    }

    // Nothing was selected before, so just select this cell.
    if (!this.selectedCell) {
      this.selectCellAndMaybePiece(cell);
      return;
    }

    // Do nothing if you select the same cell.
    if (this.selectedCell.equals(cell)) {
      return;
    }

    // If a different cell was clicked, it now depends if we had
    // a selected piece.
    if (!this.selectedPiece) {
      this.selectCellAndMaybePiece(cell);
      return;
    }
    const piece = this.selectedPiece!;

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
      this.selectCellAndMaybePiece(cell);
    }
  }

  private selectCellAndMaybePiece(cell: Cell) {
    this.selectCell(cell);
    // Also select the piece if there is one.
    if (this.selectedCell!.hasPiece()) {
      const piece = this.selectedCell!.getPiece()!;
      if (piece.hasBeenActivated() || piece.canBeActivated()) {
        this.selectPiece(piece);
      }
    }
  }

  exitStaging(): void {
    if (!this.selectedPiece) {
      return;
    }
    this.selectedPiece.deselect();
    this.selectedPiece = null;
    this.selectCell(null);
  }

  confirmMove(): void {
    if (!this.selectedPiece) {
      throw new Error('Confirming move without a staged piece.');
    }
    const piece = this.selectedPiece;

    // Cancel staging if the piece didn't actually move.
    if (!piece.hasConfirmableMove()) {
      this.exitStaging();
      return;
    }

    // Clear staging for all pieces.
    this.board.clearStagedAttackData();

    // Confirm the move, then exit staging for the next action.
    piece.confirmMove();
    this.exitStaging();

    // Potentially award points and check for win condition.
    this.removeAndAwardForDeadPieces();
  }

  confirmAttack(): void {
    if (!this.selectedPiece) {
      throw new Error('Confirming attack without a staged piece.');
    }
    const piece = this.selectedPiece;

    if (!piece.hasConfirmableAttack()) {
      // There's nothing to attack, so just cancel.
      this.exitStaging();
      return;
    }

    // Clear staging for all pieces.
    this.board.clearStagedAttackData();

    // Perform the attack.
    piece.attack();
    this.exitStaging();

    // Potentially award points and check for win condition.
    this.removeAndAwardForDeadPieces();
  }

  /**
   * Selects or deselects just the cell portion. Piece is handled separately.
   * @param cell 
   */
  private selectCell(cell: Cell | null): void {
    if (this.selectedCell) {
      this.selectedCell.selected = false;
      this.selectedCell = null;
    }
    if (cell) {
      cell.selected = true;
      this.selectedCell = cell;
    }
    this.showSelectedActions();
  }

  getSelectedCell(): Cell | null {
    return this.selectedCell;
  }

  private selectPiece(piece: Piece): void {
    if (this.selectedPiece) {
      throw new Error('There is already a selected piece');
    }
    this.selectedPiece = piece;
    this.selectedPiece.select();
    this.showSelectedActions();
  }

  showSelectedActions() {
    // Reset the state of the board before showing new actions.
    for (let cell of this.board.getCells().flat()) {
      cell.clearIndicators();
      if (cell.hasPiece()) {
        cell.getPiece()!.clearStagedAttackData();
        cell.getPiece()!.stageAction();
      }
    }

    // No piece selected, means no actions need to be shown.
    if (!this.selectedPiece) {
      return;
    }

    // Show available moves.
    if (this.selectedPiece.canMove()) {
      const moveCells = this.selectedPiece.getMoveCells();
      for (let cell of moveCells.getMoveableCells()) {
        cell.availableMove = true;
      }
      for (let cell of moveCells.getSprintableCells()) {
        cell.availableSprint = true;
      }
    }

    // Show available attack, if any.
    if (this.selectedPiece.canAttack()) {
      // Highlight all the cells for which an attack could be made.
      const attackCells = this.selectedPiece.getAttackCells();
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
      this.selectedPiece.attack();
    }
  }

  private removeAndAwardForDeadPieces(): void {
    for (let cell of this.board.getCells().flat()) {
      if (cell.hasPiece()) {
        const piece = cell.getPiece()!;
        if (piece.isDead()) {
          piece.player.removePiece(piece);
          this.turnService.getOtherPlayer(piece.player).addPoints(piece.points);
          cell.clearPiece();
        }
      }
    }
    this.gameService.checkWinCondition();
  }
}
