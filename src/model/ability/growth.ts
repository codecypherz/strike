import { AttackResults } from "../piece/attack-results";
import { Terrain } from "../terrain";
import { Ability } from "./ability";

export class Growth extends Ability {

  getAbilityName(): string {
    return 'Growth';
  }

  getAbilityDescription(): string {
    return 'Attacking a machine on Grassland terrain '
        + 'will turn that terrain into Forest.';
  }

  override takeEndOfAttackAction(attackResults: AttackResults): void {
    // Don't modify the terrain if this is staged.
    if (this.piece.isStagedAttack()) {
      return;
    }

    // Grow grassland into forest.
    for (let attackedPiece of attackResults.getAttackedPieces()) {
      const originalCell = this.piece.getBoard().getCell(attackedPiece.originalPosition);
      if (originalCell.terrain == Terrain.GRASSLAND) {
        originalCell.terrain = Terrain.FOREST;
      }
    }
  }
}
