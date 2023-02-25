import { Piece } from "./piece";

export class DashPiece extends Piece {

  getPieceType(): string {
    return 'Dash';
  }

  getPieceTypeDescription(): string {
    return 'Always moves to the end of its Attack Range and ' +
        'damages every machine in its path, including your own, ' +
        'and rotates them 180 degrees. It must have an empty terrain ' +
        'to land on at the end of its Attack Range in order to attack.';
  }
}
