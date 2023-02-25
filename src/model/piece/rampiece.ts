import { Piece } from "./piece";

export class RamPiece extends Piece {

  getPieceType(): string {
    return 'Ram';
  }

  getPieceTypeDescription(): string {
    return 'Always attacks the first machine in its Attack Range ' +
        'and knocks it backwards. It will then move onto the ' +
        'terrain left behind by the opposing machine.';
  }
}
