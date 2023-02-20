import { Piece } from "./piece";

export class MeleePiece extends Piece {

  getPieceType(): string {
    return 'Melee';
  }

  getPieceTypeDescription(): string {
    return 'Strikes the first piece in its Attack Range.';
  }
}
