import { Piece } from "./piece";

export class RamPiece extends Piece {

  getPieceType(): string {
    return 'Ram';
  }

  getPieceTypeDescription(): string {
    return 'Strikes and knocks back the first ' +
        'machine in its Attack Range. It will then proceed ' +
        'into the terrain left behind by the enemy piece.'
  }
}
