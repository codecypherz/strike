import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Cell } from "./cell";
import { GameService } from "./game.service";
import { Piece } from "./piece/piece";

/**
 * Provides behavior and simple extractions of intent.
 */
@Injectable()
export class BoardService {

  private selectedCell: Cell | null = null;
  private selectedPiece: Piece | null = null;

  constructor(
    private board: Board,
    private gameService: GameService,
    @Optional() @SkipSelf() service?: BoardService) {
    if (service) {
      throw new Error('Singleton violation: BoardService');
    }
    (window as any).boardService = this;
  }

  public reset(): void {
    this.selectedCell = null;
    this.board.reset();
  }

  public onCellClicked(cell: Cell): void {
    if (!cell) {
      throw new Error('No cell was clicked');
    }

    // Nothing was selected before, so just select this cell.
    if (!this.selectedCell) {
      this.selectCell(cell);
      // Also select the piece if there is one.
      if (this.selectedCell!.hasPiece()) {
        const piece = this.selectedCell!.getPiece()!;
        if (this.gameService.canActivatePiece(piece)) {
          this.selectPiece(piece);
        }
      }
      return;
    }

    // Do nothing if you select the same cell.
    if (this.selectedCell == cell) {
      return;
    }

    // If a different cell was clicked, it now depends if we had
    // a selected piece.
    if (!this.selectedPiece) {
      this.selectCell(cell);
      // Also select the piece if there is one.
      if (this.selectedCell!.hasPiece()) {
        const piece = this.selectedCell!.getPiece()!;
        if (this.gameService.canActivatePiece(piece)) {
          this.selectPiece(piece);
        }
      }
      return;
    }

    // We clicked a different cell with a selected piece.
    // Now we move the selected piece if it's valid based on its
    // original position.
    const piece = this.selectedPiece!;
    const srcCell = this.board.getCell(piece.getStagedPosition());
    if (this.gameService.canMove(srcCell, cell)) {
      // The piece is allowed to move here, but it hasn't been confirmed
      // by the player. Update the staged position.
      let srcPiece = srcCell.getPiece()!;
      srcCell.clearPiece();
      cell.setPiece(srcPiece);
      srcPiece.setStagedPosition(cell.position);
      // Move selection with the piece.
      this.selectCell(cell);
    }
  }

  public getSelectedCell(): Cell | null {
    return this.selectedCell;
  }

  public cancelStaging(): void {
    if (!this.selectedPiece) {
      throw new Error('Canceled staging without a staged piece.');
    }
    // Put the piece back in it's original position.
    const currentCell = this.board.getCell(this.selectedPiece.getStagedPosition());
    const originalCell = this.board.getCell(this.selectedPiece.getPosition());
    currentCell.clearPiece();
    originalCell.setPiece(this.selectedPiece);
    this.selectedPiece.setPosition(originalCell.position);
    this.selectedPiece.setSelected(false);
    this.selectedPiece.setStagedPosition(null);
    this.selectedPiece = null;
    this.selectCell(null);
  }

  public confirmMove(): void {
    if (!this.selectedPiece) {
      throw new Error('Confirming move without a staged piece.');
    }
    const piece = this.selectedPiece;
    const cell = this.board.getCell(piece.getStagedPosition());
    piece.setPosition(cell.position);
    piece.setMoved(true);
    this.gameService.activatePiece(piece);
    piece.setSelected(false);
    piece.setStagedPosition(null);

    this.selectedPiece = null;
    this.selectCell(null);
  }

  private selectCell(cell: Cell | null): void {
    if (this.selectedCell) {
      this.selectedCell.setSelected(false);
      this.selectedCell = null;
    }
    if (cell) {
      this.selectedCell = cell;
      this.selectedCell.setSelected(true);
    }
    this.showAvailableActions();
  }

  private selectPiece(piece: Piece): void {
    if (this.selectedPiece) {
      throw new Error('There is already a selected piece');
    }
    this.selectedPiece = piece;
    this.selectedPiece.setSelected(true);
    this.selectedPiece.setStagedPosition(piece.getPosition());
    this.showAvailableActions();
  }

  // TODO: When a turn ends, refresh available actions.
  private showAvailableActions() {
    for (let cell of this.board.getCells().flat()) {
      if (!this.selectedCell) {
        // No cell selected, so clear movement indicator.
        cell.setAvailableMove(false);
        cell.setAvailableAttack(false);
      } else {
        cell.setAvailableMove(this.gameService.canMove(this.selectedCell, cell));
        cell.setAvailableAttack(this.gameService.canAttack(this.selectedCell, cell));
      }
    }
  }
}
