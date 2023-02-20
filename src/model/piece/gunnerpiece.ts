import { Piece } from "./piece";

export class GunnerPiece extends Piece {

  getPieceType(): string {
    return 'Gunner';
  }

  getPieceTypeDescription(): string {
    return 'Attacks at the maximum of its Attack Range at all times.'
  }
}
