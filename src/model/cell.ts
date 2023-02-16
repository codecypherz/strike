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

  getTerrain(): Terrain {
    return this.terrain;
  }

  setTerrain(terrain: Terrain): void {
    this.terrain = terrain;
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

  isSelected(): boolean {
    return this.selected;
  }

  setSelected(selected: boolean): void {
    this.selected = selected;
  }

  setAvailableMove(availableMove: boolean): void {
    this.availableMove = availableMove;
  }

  isAvailableMove(): boolean {
    return this.availableMove;
  }

  setAvailableAttack(availableAttack: boolean): void {
    this.availableAttack = availableAttack;
  }

  isAvailableAttack(): boolean {
    return this.availableAttack;
  }
}
