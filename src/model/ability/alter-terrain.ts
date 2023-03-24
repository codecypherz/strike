import { Cell } from "../cell";
import { Piece } from "../piece/piece";
import { Terrain } from "../terrain";
import { Ability } from "./ability";

export class AlterTerrain extends Ability {

  getAbilityName(): string {
    return 'Alter Terrain';
  }

  getAbilityDescription(): string {
    return 'After inflicting damage, the terrain below your machine '
        + 'will lower and the terrain below the opposing machine will raise.';
  }

  override takeEndOfAttackAction(attackedPieces: Piece[]): void {
    // Don't modify the terrain if this is staged.
    if (this.piece.isStagedAttack()) {
      return;
    }

    // Lower this piece's terrain.
    this.piece.getBoard().getCell(this.piece.position).lowerTerrain();

    // Raise the terrain of each attacked piece.
    for (let piece of attackedPieces) {
      piece.getBoard().getCell(piece.position).raiseTerrain();
    }
  }
}
