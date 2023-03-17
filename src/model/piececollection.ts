import { Piece } from "./piece/piece";

export class PieceCollection {

  private pieces = new Set<Piece>();

  addPiece(piece: Piece): void {
    if (this.pieces.has(piece)) {
      throw new Error('Attempting to add the same piece to the same player.');
    }
    this.pieces.add(piece);
  }

  removePiece(piece: Piece): void {
    if (!this.pieces.has(piece)) {
      throw new Error('This set does not have ' + piece.name + ' to remove.');
    }
    this.pieces.delete(piece);
  }
}