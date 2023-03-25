import { AttackResults } from "../piece/attack-results";
import { Ability } from "./ability";

export class AlterTerrain extends Ability {

  getAbilityName(): string {
    return 'Alter Terrain';
  }

  getAbilityDescription(): string {
    return 'After inflicting damage, the terrain below your machine '
        + 'will lower and the terrain below the opposing machine will raise.';
  }

  override takeEndOfAttackAction(attackResults: AttackResults): void {
    // Don't modify the terrain if this is staged.
    if (this.piece.isStagedAttack()) {
      return;
    }

    // Lower this piece's terrain.
    this.piece.getBoard().getCell(this.piece.position).lowerTerrain();

    // Raise the terrain of each attacked piece.
    for (let attackedPiece of attackResults.getAttackedPieces()) {
      const piece = attackedPiece.piece;
      piece.getBoard().getCell(piece.position).raiseTerrain();
    }
  }
}
