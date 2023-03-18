import { v4 as uuidv4 } from 'uuid';
import { Direction } from "./direction";
import { Piece } from "./piece/piece";
import { PieceCollection } from "./piececollection";

/**
 * A cell is a portion of the board. A cell has a certain type of terrain
 * and it may contain a piece.
 */
export class Player {

  private id = uuidv4();
  private active: boolean = false;
  private points: number = 0;

  // Pieces the player currently has.
  private pieces = new PieceCollection();

  // Turn metadata
  private piecesActivated = new PieceCollection();

  constructor(
    readonly isFirst: boolean,
    readonly name: string,
    readonly defaultDirection: Direction) {
      this.active = isFirst;
  }

  isPlayer1(): boolean {
    return this.isFirst;
  }

  isPlayer2(): boolean {
    return !this.isFirst;
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
    if (this.pieces.size() == 1) {
      const piece = this.pieces.getOnly();
      if (!piece.canMove()) {
        return true;
      }
      // Can end your turn if the piece is stuck.
      return piece.isStuck();
    }
    // Normally, the number of pieces moved must equal two.
    if (this.getNumMoved() == 2) {
      return true;
    }
    // If none of the pieces can move, then you can end your turn.
    return this.areAllPiecesStuck();
  }

  private areAllPiecesStuck(): boolean {
    for (let piece of this.pieces.getSet()) {
      if (piece.canMove() && !piece.isStuck()) {
        return false;
      }
    }
    return true;
  }

  getNumMoved() {
    let numMoved = 0;
    for (let piece of this.piecesActivated.getSet()) {
      if (piece.hasMoved()) {
        numMoved++;
      }
    }
    return numMoved;
  }

  addPiece(piece: Piece): void {
    this.pieces.add(piece);
  }

  removePiece(piece: Piece): void {
    this.pieces.remove(piece);
  }

  getPieces(): PieceCollection {
    return this.pieces;
  }

  isLastPiece(piece: Piece): boolean {
    return this.pieces.size() == 1 && this.pieces.has(piece);
  }

  addActivatedPiece(piece: Piece): void {
    this.piecesActivated.add(piece);
  }

  canActivatePiece(): boolean {
    // If the player has 2 or less pieces, they can always activate.
    if (this.pieces.size() <= 2) {
      return true;
    }
    // A player can not activate more than 2 pieces.
    return this.piecesActivated.size() < 2;
  }

  clearTurnData(): void {
    this.piecesActivated = new PieceCollection();
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
