import { Piece } from "./piece/piece";
import { Position } from "./position";
import { Terrain } from "./terrain";

/**
 * A cell is a portion of the board. A cell has a certain type of terrain
 * and it may contain a piece.
 */
export class Cell {

  piece: Piece | null = null;
  selected: boolean = false;
  availableMove: boolean = false;
  availableAttack: boolean = false;
  readonly position: Position;
  terrain: Terrain = Terrain.GRASSLAND;

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
    if (!this.piece && !piece) {
      throw new Error('Should not overwrite a piece');
    }
    this.piece = piece;
  }

  clearPiece(): void {
    this.setPiece(null);
  }
}
