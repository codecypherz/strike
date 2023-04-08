import { AttackResults } from "../piece/attack-results";
import { Terrain } from "../terrain";
import { Ability } from "./ability";

export class Burn extends Ability {

  getAbilityName(): string {
    return 'Burn';
  }

  getAbilityDescription(): string {
    return 'Attacking a machine on Forest terrain '
        + 'will turn that terrain into Grassland.';
  }

  override takeEndOfAttackAction(attackResults: AttackResults): void {
    // Don't modify the terrain if this is staged.
    if (this.piece.isStagedAttack()) {
      return;
    }

    // Burn Forest into Grassland.
    for (let attackedPiece of attackResults.getAttackedPieces()) {
      const originalCell = this.piece.getBoard().getCell(attackedPiece.originalPosition);
      if (originalCell.terrain == Terrain.FOREST) {
        originalCell.terrain = Terrain.GRASSLAND;
      }
    }
  }
}
