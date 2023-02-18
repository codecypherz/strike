import { Piece } from "./piece/piece";

/**
 * A cell is a portion of the board. A cell has a certain type of terrain
 * and it may contain a piece.
 */
export class Player {

  readonly id: string;
  readonly name: string;

  private active: boolean = false;
  private points: number = 0;

  // Turn metadata
  private piecesActivated: Set<Piece> = new Set<Piece>();

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  equals(other: Player): boolean {
    return this.id == other.id;
  }

  reset(): void {
    this.active = false;
    this.points = 0;
    this.clearTurnData();
  }

  canEndTurn(): boolean {
    return this.getNumMoved() == 2;
  }

  canMove(): boolean {
    return this.getNumMoved() < 2;
  }

  getNumMoved() {
    let numMoved = 0;
    for (let piece of this.piecesActivated) {
      if (piece.moved) {
        numMoved++;
      }
    }
    return numMoved;
  }

  addActivatedPiece(piece: Piece): void {
    this.piecesActivated.add(piece);
  }

  canActivatePiece(): boolean {
    return this.piecesActivated.size < 2;
  }

  clearTurnData(): void {
    this.piecesActivated = new Set<Piece>();
  }

  setActive(active: boolean): void {
    this.active = active;
  }

  toggleActive(): void {
    this.clearTurnData();
    this.active = !this.active;
  }

  isActive(): boolean {
    return this.active;
  }

  setPoints(points: number): void {
    this.points = points;
  }

  addPoints(points: number): void {
    this.points += points;
  }

  getPoints(): number {
    return this.points;
  }
}
