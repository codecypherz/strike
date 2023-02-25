import { getOnly } from "src/util/sets";
import { Piece } from "./piece/piece";

/**
 * A cell is a portion of the board. A cell has a certain type of terrain
 * and it may contain a piece.
 */
export class Player {

  private active: boolean = false;
  private points: number = 0;

  private pieces = new Set<Piece>();

  // Turn metadata
  private piecesActivated = new Set<Piece>();

  constructor(
    readonly id: string,
    readonly name: string,
    readonly defaultDirection: number) {
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
    // Special rule if you have 1 piece left.
    if (this.pieces.size == 1) {
      const piece = getOnly(this.pieces);
      return piece.numMoves == 2;
    }
    // Normally, the number of pieces moved must equal two.
    return this.getNumMoved() == 2;
  }

  getNumMoved() {
    let numMoved = 0;
    for (let piece of this.piecesActivated) {
      if (piece.numMoves > 0) {
        numMoved++;
      }
    }
    return numMoved;
  }

  addPiece(piece: Piece): void {
    if (this.pieces.has(piece)) {
      throw new Error('Attempting to add the same piece to the same player.');
    }
    this.pieces.add(piece);
  }

  getPieces(): Set<Piece> {
    return this.pieces;
  }

  isLastPiece(piece: Piece): boolean {
    return this.pieces.size == 1 && this.pieces.has(piece);
  }

  addActivatedPiece(piece: Piece): void {
    this.piecesActivated.add(piece);
  }

  canActivatePiece(): boolean {
    // If the player has 2 or less pieces, they can always activate.
    if (this.pieces.size <= 2) {
      return true;
    }
    // A player can not activate more than 2 pieces.
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
