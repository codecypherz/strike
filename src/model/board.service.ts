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
    this.showAvailableActions();
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

    // We clicked a different cell with a selected piece.
    // Now we move the selected piece if it's valid based on its
    // original position.
    const piece = this.selectedPiece!;
    const srcCell = this.board.getCell(piece.stagedPosition!);
    if (piece.canMoveTo(this.board, cell)) {
      // The piece is allowed to move here, but it hasn't been confirmed
      // by the player. Update the staged position.
      let srcPiece = srcCell.getPiece()!;
      srcCell.clearPiece();
      cell.setPiece(srcPiece);
      srcPiece.stagedPosition = cell.position;
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
      // Put the piece back in it's original position.
    const currentCell = this.board.getCell(this.selectedPiece.stagedPosition!);
    currentCell.clearPiece();
    const originalCell = this.board.getCell(this.selectedPiece.position);
    originalCell.clearPiece();
    originalCell.setPiece(this.selectedPiece);
    this.selectedPiece.position = originalCell.position;
    this.selectedPiece.deselect();
    this.selectedPiece = null;
    this.selectCell(null);
  }

  confirmMove(): void {
    if (!this.selectedPiece) {
      throw new Error('Confirming move without a staged piece.');
    }
    const piece = this.selectedPiece;
    const stagedCell = this.board.getCell(piece.stagedPosition!);

    // Cancel staging if the piece didn't actually move.
    if (piece.position.equals(piece.stagedPosition)) {
      this.exitStaging();
      return;
    }

    // Moving the piece - update all the metadata.
    piece.position = stagedCell.position;
    piece.confirmDirection();
    piece.moved = true;
    piece.activate();

    this.exitStaging();
  }

  confirmAttack(): void {
    if (!this.selectedPiece) {
      throw new Error('Confirming attack without a staged piece.');
    }
    const piece = this.selectedPiece;
    const stagedCell = this.board.getCell(piece.stagedPosition!);

    // This is an action that can combine with movement, but checking attack first.
    let cellToAttack = null;
    for (let targetCell of piece.getAttackCells(this.board)) {
      if (targetCell.hasPiece()) {
        cellToAttack = targetCell;
        break;
      }
    }
    // There's nothing to attack, so just cancel.
    // Can disable the button later if this is deemed confusing.
    if (!cellToAttack) {
      this.exitStaging();
      return;
    }
    // TODO: This is a bug and will break for other piece types.
    if (!cellToAttack.hasPiece()) {
      throw new Error('Cell to attack does not have a piece.');
    }
    const targetPiece = cellToAttack!.getPiece()!;

    // Clear staging for all pieces.
    for (let cell of this.board.getCells().flat()) {
      if (cell.hasPiece()) {
        cell.getPiece()!.clearStagedAttack();
      }
    }

    // Always confirm direction.
    piece.confirmDirection();
    // Determine if there is movement.
    if (!piece.position.equals(piece.stagedPosition)) {
      piece.position = stagedCell.position;
      piece.moved = true;
    }

    // Perform the attack.
    piece.attack(this.board);
    // TODO: Look at all pieces for a death condition.
    if (targetPiece.getHealth() == 0) {
      piece.player.addPoints(targetPiece.points);
      cellToAttack.clearPiece();
      this.gameService.checkWinCondition();
    }

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
    this.showAvailableActions();
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
    this.showAvailableActions();
  }

  showAvailableActions() {
    for (let cell of this.board.getCells().flat()) {
      // Reset state for all cells.
      cell.availableMove = false;
      cell.availableAttack = false;
      if (cell.hasPiece()) {
        // Reset staged attack for all pieces.
        cell.getPiece()!.clearStagedAttack();
        cell.getPiece()!.stageAttack();
      }
    }
    if (this.selectedPiece) {
      if (this.selectedPiece.canMove()) {
        for (let cell of this.selectedPiece.getMoveCells(this.board)) {
          cell.availableMove = true;
        }
      }
      if (this.selectedPiece.canAttack()) {
        // Highlight all the cells for which an attack could be made.
        for (let targetCell of this.selectedPiece.getAttackCells(this.board)) {
          targetCell.availableAttack = true;
        }
        // Since we are staged, this will show the impact of an attack made
        // with the selected piece.
        this.selectedPiece.attack(this.board);
      }
    }
  }
}
