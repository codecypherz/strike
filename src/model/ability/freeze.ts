import { AttackResults } from "../piece/attack-results";
import { Terrain } from "../terrain";
import { Ability } from "./ability";

export class Freeze extends Ability {

  getAbilityName(): string {
    return 'Freeze';
  }

  getAbilityDescription(): string {
    return 'Attacking a machine on Marsh terrain '
        + 'will turn that terrain into Grassland.';
  }

  override takeEndOfAttackAction(attackResults: AttackResults): void {
    // Don't modify the terrain if this is staged.
    if (this.piece.isStagedAttack()) {
      return;
    }

    // Not sure how freezing marsh turns into grassland, but here we are.
    for (let attackedPiece of attackResults.getAttackedPieces()) {
      const originalCell = this.piece.getBoard().getCell(attackedPiece.originalPosition);
      if (originalCell.terrain == Terrain.MARSH) {
        originalCell.terrain = Terrain.GRASSLAND;
      }
    }
  }
}
