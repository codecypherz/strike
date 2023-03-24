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
  availableMove = false;
  availableMoveStarting = false;
  availableSprint = false;
  willBeAttacked = false;
  inAttackRange = false;
  whereAttackWillEnd = false;

  constructor(row: number, col: number) {
    this.position = new Position(row, col);
  }

  clearIndicators() {
    this.availableMove = false;
    this.availableMoveStarting = false;
    this.availableSprint = false;
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
      throw new Error(
        'Attempting to overwrite ' + this.piece.name + ' with ' + piece.name);
    }
    this.piece = piece;
  }

  clearPiece(): void {
    this.setPiece(null);
  }

  raiseTerrain(): void {
    switch (this.terrain) {
      case Terrain.CHASM:
        this.terrain = Terrain.MARSH;
        return;
      case Terrain.MARSH:
        this.terrain = Terrain.GRASSLAND;
        return;
      case Terrain.GRASSLAND:
        this.terrain = Terrain.FOREST;
        return;
      case Terrain.FOREST:
        this.terrain = Terrain.HILL;
        return;
      case Terrain.HILL:
        this.terrain = Terrain.MOUNTAIN;
        return;
      case Terrain.MOUNTAIN:
        // Nothing higher
      default:
        return;
    }
  }

  lowerTerrain(): void {
    switch (this.terrain) {
      case Terrain.MOUNTAIN:
        this.terrain = Terrain.HILL;
        return;
      case Terrain.HILL:
        this.terrain = Terrain.FOREST;
        return;
      case Terrain.FOREST:
        this.terrain = Terrain.GRASSLAND;
        return;
      case Terrain.GRASSLAND:
        this.terrain = Terrain.MARSH;
        return;
      case Terrain.MARSH:
        this.terrain = Terrain.CHASM;
        return;
      case Terrain.CHASM:
        // Nothing lower
      default:
        return;
    }
  }
}
