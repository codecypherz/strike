import { Ability } from "./ability";

export class Whiplash extends Ability {

  getAbilityName(): string {
    return 'Whiplash';
  }

  getAbilityDescription(): string {
    return 'At the start of each turn, all pieces within Attack Range ' +
      'rotate 180 degrees.';
  }

  override takeStartOfTurnAction(): void {
    // Get all cells in attack range.
    const sprayCells = this.getCellsInRange_(this.piece.position, this.piece.attackRange);

    // Rotate every piece you find.
    for (let cell of sprayCells) {
      if (cell.hasPiece()) {
        const piece = cell.getPiece()!;
        // Make sure you don't rotate yourself.
        if (piece != this.piece) {
          piece.rotate180();
        }
      }
    }
  }
}
