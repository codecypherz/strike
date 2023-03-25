import { Cell } from "../cell";
import { Direction } from "../direction";
import { AttackResults } from "../piece/attack-results";
import { Piece } from "../piece/piece";
import { Terrain } from "../terrain";
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
    let range = null;
    if (attackPos.row < selfPos.row) {
      if (attackPos.col != selfPos.col) {
        throw new Error('Cannot handle diagonal retaliate');
      }
      range = selfPos.row - attackPos.row;
      this.setSelfDirection(attackingPiece, Direction.UP);
    } else if (attackPos.row > selfPos.row) {
      if (attackPos.col != selfPos.col) {
        throw new Error('Cannot handle diagonal retaliate');
      }
      range = attackPos.row - selfPos.row;
      this.setSelfDirection(attackingPiece, Direction.DOWN);
    } else if (attackPos.col < selfPos.col) {
      if (attackPos.row != selfPos.row) {
        throw new Error('Cannot handle diagonal retaliate');
      }
      range = selfPos.col - attackPos.col;
      this.setSelfDirection(attackingPiece, Direction.LEFT);
    } else if (attackPos.col > selfPos.col) {
      if (attackPos.row != selfPos.row) {
        throw new Error('Cannot handle diagonal retaliate');
      }
      range = attackPos.col - selfPos.col;
      this.setSelfDirection(attackingPiece, Direction.RIGHT);
    }

    // If in range, deal 1 damage to the attacker.
    if (range == null) {
      throw new Error('Unable to determine range for retaliate');
    }
    if (this.piece.attackRange >= range) {
      attackingPiece.takeDamage_(1);
    }
  }

  private setSelfDirection(attackingPiece: Piece, direction: Direction): void {
    // Can't call this.piece.setDirection because self is not staged, attacker is staged.
    if (attackingPiece.isStagedAttack()) {
      this.piece.stagedDirection = direction.degrees;
    } else {
      this.piece.setDirection(direction);
    }
  }
}
