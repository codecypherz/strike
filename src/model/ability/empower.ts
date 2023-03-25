import { Ability } from "./ability";

export class Empower extends Ability {

  getAbilityName(): string {
    return 'Empower';
  }

  getAbilityDescription(): string {
    return 'At the start of each turn, all friendly machines within Attack Range '
        + 'gain <buff>+1</buff> Attack Power. Effects can stack.';
  }

  override takeStartOfTurnAction(): void {
    // Get all cells in attack range.
    const buffCells = this.getCellsInRange_(this.piece.position, this.piece.attackRange);

    // Buff every ally you find.
    for (let cell of buffCells) {
      if (cell.hasPiece()) {
        const piece = cell.getPiece()!;
        // Don't buff yourself or your enemies.
        if (piece != this.piece && piece.getPlayer().equals(this.piece.getPlayer())) {
          piece.buffAttack(1);
        }
      }
    }
  }
}
