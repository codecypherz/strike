import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Cell } from "../model/cell";
import { Piece } from "../model/piece/piece";

/**
 * Service to centrally manage selection of cells and pieces.
 */
@Injectable()
export class SelectService {

  private cell: Cell | null = null;
  private piece: Piece | null = null;
  private notSelectedText: string = '';

  constructor(
    @Optional() @SkipSelf() service?: SelectService) {

    if (service) {
      throw new Error('Singleton violation: SelectService');
    }
  }

  setNotSelectedText(text: string): void {
    this.notSelectedText = text;
  }

  getNotSelectedText(): string {
    return this.notSelectedText;
  }

  selectCell(cell: Cell): void {
    if (this.cell == cell) {
      return;
    }

    this.deselectCell();

    this.cell = cell;
    this.cell.selected = true;

    if (this.cell.hasPiece()) {
      this.selectPiece(this.cell.getPiece()!);
    } else {
      this.deselectPiece();
    }
  }

  isCellSelected(): boolean {
    return this.cell != null;
  }

  getSelectedCell(): Cell | null {
    return this.cell;
  }

  selectPiece(piece: Piece): void {
    if (this.piece == piece) {
      return;
    }

    // Different piece, so first thing is reset.
    this.deselectPiece();

    // Also deselect the cell if the piece is not on the board.
    if (!piece.isOnBoard()) {
      this.deselectCell();
    }

    // Select the piece.
    this.piece = piece;
    this.piece.select();
  }

  isPieceSelected(): boolean {
    return this.piece != null;
  }

  getSelectedPiece(): Piece | null {
    return this.piece;
  }

  deselect(): void {
    this.deselectCell();
    this.deselectPiece();
  }

  private deselectCell(): void {
    if (this.cell) {
      this.cell.selected = false;
    }
    this.cell = null;
  }

  private deselectPiece(): void {
    if (this.piece) {
      this.piece.deselect();
    }
    this.piece = null;
  }
}
