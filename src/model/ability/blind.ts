import { Ability } from "./ability";

export class Blind extends Ability {

  getAbilityName(): string {
    return 'Blind';
  }

  getAbilityDescription(): string {
    return 'Enemy machines within Attack Range lose <debuff>-1</debuff> '
        + 'Attack Power for the rest of the turn. Effects can stack.';
  }

  override takeStartOfTurnAction(): void {
    // Get all cells in attack range.
    const buffCells = this.piece.getBoard().getCellsInRange(
      this.piece.position, this.piece.attackRange);

    // Lower the attack of every enemy you find.
    for (let cell of buffCells) {
      if (cell.hasPiece()) {
        const piece = cell.getPiece()!;
        // Only harm your enemies
        if (piece != this.piece && !piece.getPlayer().equals(this.piece.getPlayer())) {
          piece.buffAttack(-1);
        }
      }
    }
  }
}
