import { Board } from "../board";
import { Cell } from "../cell";
import { Position } from "../position";
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
    // Get all cells in attack range.
    const sprayCells = this.piece.getBoard().getCellsInRange(
      this.piece.position, this.piece.attackRange);

    // Damage every piece you find.
    for (let cell of sprayCells) {
      if (cell.hasPiece()) {
        const piece = cell.getPiece()!;
        // Make sure you don't hurt yourself.
        if (piece != this.piece) {
          piece.takeDamage_(1);
        }
      }
    }
  }
}
