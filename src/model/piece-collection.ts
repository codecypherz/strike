import { getOnly } from "src/util/sets";
import { Piece } from "./piece/piece";

export class PieceCollection {

  private pieces = new Set<Piece>();

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