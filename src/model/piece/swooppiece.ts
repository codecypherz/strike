import { Piece } from "./piece";

export class SwoopPiece extends Piece {

  getPieceType(): string {
    return 'Swoop';
  }

  getPieceTypeDescription(): string {
    return 'Always attacks the first machine in its Attack Range ' +
        'and moves next to it. Gains +1 Combat Power on all terrains ' +
        'and can ignore all terrain penalties.';
  }
}
