import { Ability } from "./ability";

export class Spray extends Ability {

  getAbilityName(): string {
    return 'Spray';
  }

  getAbilityDescription(): string {
    return 'All machines in attack range <debuff>lose 1 HP</debuff>, ' +
      'friend or foe, during the start of every turn.';
  }

  override takeStartOfTurnAction(): void {
    if (this.piece.getPlayer().isActive()) {
      for (let cell of this.piece.getBoard().getSurroundingCells(this.piece.getPosition())) {
        if (cell.hasPiece()) {
          const piece = cell.getPiece()!;
          piece.takeDamage_(1);
        }
      }
    }
  }
}
