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
    turnService: TurnService,
    private gameService: GameService,
    @Optional() @SkipSelf() service?: BoardService) {

    if (service) {
      throw new Error('Singleton violation: BoardService');
    }

    turnService.addEventListener(TurnService.END_TURN_EVENT, this.onEndTurn.bind(this));

    (window as any).boardService = this;
  }

  reset(): void {
    this.exitStaging();
    this.board.reset();
  }

  onEndTurn(): void {
    this.exitStaging();
    this.selectedCell = null;
    this.selectedPiece = null;
    // This part needs to happen after exiting staging in order for
    // a staged piece to be properly reset.
    for (let cell of this.board.getCells().flat()) {
      cell.selected = false;
      if (cell.hasPiece()) {
        cell.getPiece()!.clearTurnData();
      }
    }
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
    if (piece.canMoveTo(this.board, cell)) {
      // Move the piece.
      piece.moveTo(this.board, cell);
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
    this.selectedPiece.deselect(this.board);
    this.selectedPiece = null;
    this.selectCell(null);
  }

  confirmMove(): void {
    if (!this.selectedPiece) {
      throw new Error('Confirming move without a staged piece.');
    }
    const piece = this.selectedPiece;

    // Cancel staging if the piece didn't actually move.
    if (!piece.isMoveStaged()) {
      this.exitStaging();
      return;
    }

    // Confirm the move, then exit staging for the next action.
    piece.confirmMove();
    this.exitStaging();
  }

  confirmAttack(): void {
    if (!this.selectedPiece) {
      throw new Error('Confirming attack without a staged piece.');
    }
    const piece = this.selectedPiece;
    const stagedCell = this.board.getCell(piece.stagedPosition!);

    if (!piece.hasAttackTarget(this.board)) {
      // There's nothing to attack, so just cancel.
      this.exitStaging();
      return;
    }

    // Clear staging for all pieces.
    this.board.clearStagedAttackData();

    // Perform the attack.
    piece.attack(this.board);

    // Look for all pieces that might have died as a result.
    for (let cell of this.board.getCells().flat()) {
      if (cell.hasPiece()) {
        const p = cell.getPiece()!;
        if (p.getHealth() == 0) {
          // Award points to the attacking piece's player (active player).
          piece.player.addPoints(p.points);
          cell.clearPiece();
        }
      }
    }

    // See if anyone won, then exit staging.
    this.gameService.checkWinCondition();
    this.exitStaging();
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
      // Reset state for all cells.
      cell.availableMove = false;
      cell.availableAttack = false;
      if (cell.hasPiece()) {
        // Reset staged attack for all pieces.
        cell.getPiece()!.clearStagedAttackData();
        cell.getPiece()!.stageAttack();
      }
    }

    // No piece selected, means no actions need to be shown.
    if (!this.selectedPiece) {
      return;
    }

    // Show available moves.
    if (this.selectedPiece.canMove()) {
      for (let cell of this.selectedPiece.getMoveCells(this.board)) {
        cell.availableMove = true;
      }
    }

    // Show available attack, if any.
    if (this.selectedPiece.canAttack()) {
      // Highlight all the cells for which an attack could be made.
      const attackCells = this.selectedPiece.getAttackCells(this.board);
      // TODO: UI is using piece presence to distinguish targets.
      //       This needs to be explicit state set on the cell instead.
      for (let cell of attackCells.toAttack) {
        cell.availableAttack = true;
      }
      for (let cell of attackCells.inRange) {
        cell.availableAttack = true;
      }
      // Since we are staged, this will show the impact of an attack made
      // with the selected piece.
      this.selectedPiece.attack(this.board);
    }
  }
}
