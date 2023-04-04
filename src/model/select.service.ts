import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Cell } from "./cell";
import { Piece } from "./piece/piece";

/**
 * Service to centrally manage selection of cells and pieces.
 */
@Injectable()
export class SelectService {

  private cell: Cell | null = null;
  private piece: Piece | null = null;

  constructor(
    @Optional() @SkipSelf() service?: SelectService) {

    if (service) {
      throw new Error('Singleton violation: SelectService');
    }
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

    this.deselectPiece();

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