import { Piece } from "./piece/piece";

/**
 * A cell is a portion of the board. A cell has a certain type of terrain
 * and it may contain a piece.
 */
export class Cell {

  piece: Piece | null;
  selected: boolean;

  getPiece(): Piece | null {
    return this.piece;
  }

  setPiece(piece: Piece | null) {
    this.piece = piece;
  }

  isSelected(): boolean {
    return this.selected;
  }

  setSelected(selected: boolean): void {
    this.selected = selected;
  }
}
