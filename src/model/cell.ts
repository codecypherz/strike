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
  readonly position: Position;
  terrain: Terrain = Terrain.GRASSLAND;

  // Temporary indicators
  availableMove: boolean = false;
  willBeAttacked: boolean = false;
  inAttackRange: boolean = false;
  whereAttackWillEnd: boolean = false;

  constructor(row: number, col: number) {
    this.position = new Position(row, col);
  }

  clearIndicators() {
    this.availableMove = false;
    this.willBeAttacked = false;
    this.inAttackRange = false;
    this.whereAttackWillEnd = false;
  }

  equals(other: Cell): boolean {
    return this.position.equals(other.position);
  }

  hasPiece(): boolean {
    return this.piece != null;
  }

  getPiece(): Piece | null {
    return this.piece;
  }

  setPiece(piece: Piece | null) {
    if (this.piece && piece) {
      throw new Error('Should not overwrite a piece');
    }
    this.piece = piece;
  }

  clearPiece(): void {
    this.setPiece(null);
  }
}
