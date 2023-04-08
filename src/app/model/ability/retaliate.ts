import { Piece } from "../piece/piece";
import { Ability } from "./ability";

export class Retaliate extends Ability {

  getAbilityName(): string {
    return 'Retaliate';
  }

  getAbilityDescription(): string {
    return 'Rotates toward its Attacker and inflicts 1 damage if it is in Range.';
  }

  override takeActionAfterBeingAttacked(attackingPiece: Piece): void {
    // Turn toward the attacking piece based on attacking piece's current location.
    // Use position accessors because we should show retaliate damage during staging.
    const attackPos = attackingPiece.getPosition();
    const selfPos = this.piece.getPosition();
    const direction = selfPos.getDirectionTowards(attackPos);

    // Can't call this.piece.setDirection because self is not staged, attacker is staged.
    if (attackingPiece.isStagedAttack()) {
      this.piece.stagedDirection = direction.degrees;
    } else {
      this.piece.setDirection(direction);
    }

    // Compute range.
    // The diff between either row or col will be zero since diagonal is not supported.
    let range = Math.abs(attackPos.row - selfPos.row) + Math.abs(attackPos.col - selfPos.col);

    // Deal damage if in range.
    if (this.piece.attackRange >= range) {
      attackingPiece.takeDamage_(1);
    }
  }
}
