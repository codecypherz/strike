import { Piece } from "./piece/piece";
import { Position } from "./position";

/**
 * A cell is a portion of the board. A cell has a certain type of terrain
 * and it may contain a piece.
 */
export class Cell {

  piece: Piece | null;
  selected: boolean;
  readonly position: Position;

  constructor(row: number, col: number) {
    this.position = new Position(row, col);
  }

  hasPiece(): boolean {
    return this.piece != null;
  }

  getPiece(): Piece | null {
    return this.piece;
  }

  setPiece(piece: Piece | null) {
    this.piece = piece;
    if (this.piece) {
      this.piece.setPosition(this.position);
    }
  }

  clearPiece(): void {
    this.setPiece(null);
  }

  isSelected(): boolean {
    return this.selected;
  }

  setSelected(selected: boolean): void {
    this.selected = selected;
  }
}
