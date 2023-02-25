import { Piece } from "./piece";

export class PullPiece extends Piece {

  getPieceType(): string {
    return 'Pull';
  }

  getPieceTypeDescription(): string {
    return 'Always attacks the first machine in its Attack Range ' +
        'and pulls the enemy one terrain closer to it. Gains +1 Combat ' +
        'Power while on Marsh terrain and can traverse through it ' +
        'without hindering its movement.';
  }
}
