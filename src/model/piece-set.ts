import { getOnly } from "src/util/sets";
import { Piece } from "./piece/piece";

export class PieceSet {

  private pieces = new Set<Piece>();
  public name: string = '';

  constructor(name?: string) {
    this.name = name || '';
  }

  add(piece: Piece): void {
    if (this.pieces.has(piece)) {
      throw new Error('Attempting to add the same piece to the same player.');
    }
    this.pieces.add(piece);
  }

  remove(piece: Piece): void {
    if (!this.pieces.has(piece)) {
      throw new Error('This set does not have ' + piece.name + ' to remove.');
    }
    this.pieces.delete(piece);
  }

  getPoints(): number {
    let points = 0;
    for (let piece of this.pieces) {
      points += piece.points;
    }
    return points;
  }

  size(): number {
    return this.pieces.size;
  }

  has(piece: Piece): boolean {
    return this.pieces.has(piece);
  }

  getOnly(): Piece {
    return getOnly(this.pieces);
  }

  getSet(): Set<Piece> {
    return this.pieces;
  }
}