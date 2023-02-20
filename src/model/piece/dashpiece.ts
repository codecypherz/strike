import { Piece } from "./piece";

export class DashPiece extends Piece {

  getPieceType(): string {
    return 'Dash';
  }

  getPieceTypeDescription(): string {
    return 'Advances to the end of its Attack Range and ' +
        'damages and spins every machine in its path, even ' +
        'your own. To attack, it must have an empty terrain ' +
        'to land on at the end of its Attack Range.';
  }
}
