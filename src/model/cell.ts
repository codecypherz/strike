import { Piece } from "./piece/piece";

/**
 * A cell is a portion of the board. A cell has a certain type of terrain
 * and it may contain a piece.
 */
export class Cell {

  piece: Piece | null;

  getPiece(): Piece | null {
    return this.piece;
  }

  setPiece(piece: Piece | null) {
    this.piece = piece;
  }
}
