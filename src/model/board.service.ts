import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Cell } from "./cell";
import { GameService } from "./game.service";
import { Piece } from "./piece/piece";
import { Position } from "./position";

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
    if (this.selectedCell.equals(cell)) {
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
    const srcCell = this.board.getCell(piece.stagedPosition!);
    if (this.gameService.canMove(srcCell, cell)) {
      // The piece is allowed to move here, but it hasn't been confirmed
      // by the player. Update the staged position.
      let srcPiece = srcCell.getPiece()!;
      srcCell.clearPiece();
      cell.setPiece(srcPiece);
      srcPiece.stagedPosition = cell.position;
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
    const currentCell = this.board.getCell(this.selectedPiece.stagedPosition!);
    const originalCell = this.board.getCell(this.selectedPiece.position);
    currentCell.clearPiece();
    originalCell.setPiece(this.selectedPiece);
    this.selectedPiece.position = originalCell.position;
    this.selectedPiece.selected = false;
    this.selectedPiece.stagedPosition = null;
    this.selectedPiece = null;
    this.selectCell(null);
  }

  public confirmMove(): void {
    if (!this.selectedPiece) {
      throw new Error('Confirming move without a staged piece.');
    }
    const piece = this.selectedPiece;
    const cell = this.board.getCell(piece.stagedPosition!);

    // Cancel staging if the piece didn't actually move.
    if (piece.position.equals(piece.stagedPosition)) {
      this.cancelStaging();
      return;
    }

    // Moving the piece - update all the metadata.
    piece.position = cell.position;
    piece.moved = true;
    this.gameService.activatePiece(piece);
    piece.selected = false;
    piece.stagedPosition = null;

    this.selectedPiece = null;
    this.selectCell(null);
  }

  private selectCell(cell: Cell | null): void {
    if (this.selectedCell) {
      this.selectedCell.selected = false;
      this.selectedCell = null;
    }
    if (cell) {
      this.selectedCell = cell;
      this.selectedCell.selected = true;
    }
    this.showAvailableActions();
  }

  private selectPiece(piece: Piece): void {
    if (this.selectedPiece) {
      throw new Error('There is already a selected piece');
    }
    this.selectedPiece = piece;
    this.selectedPiece.selected = true;
    this.selectedPiece.stagedPosition = piece.position;
    this.showAvailableActions();
  }

  // TODO: When a turn ends, refresh available actions.
  private showAvailableActions() {
    for (let cell of this.board.getCells().flat()) {
      if (!this.selectedCell) {
        // No cell selected, so clear movement indicator.
        cell.availableMove = false;
        cell.availableAttack = false;
      } else {
        cell.availableMove = this.gameService.canMove(this.selectedCell, cell);
        cell.availableAttack = this.gameService.canAttack(this.selectedCell, cell);
      }
    }
  }
}
