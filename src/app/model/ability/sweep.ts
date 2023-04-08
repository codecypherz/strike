import { Cell } from "../cell";
import { AttackResults } from "../piece/attack-results";
import { DashPiece } from "../piece/dash-piece";
import { PullPiece } from "../piece/pull-piece";
import { RamPiece } from "../piece/ram-piece";
import { Ability } from "./ability";

export class Sweep extends Ability {

  getAbilityName(): string {
    return 'Sweep';
  }

  getAbilityDescription(): string {
    return 'Attacking hits your target and any machines perpendicular to it.';
  }

  override takeEndOfAttackAction(attackResults: AttackResults): void {
    // The sweep ability only supports a single target (as of right now).
    const attackedPieces = attackResults.getAttackedPieces();
    if (attackedPieces.length != 1) {
      // This works, but it would have broken if Thunderjaw had a range of 3.
      throw new Error('Sweep does not support more than 1 target');
    }
    const attackPos = attackedPieces.at(0)!.originalPosition;

    // Determine the direction of the attack.
    const attackDir = this.piece.getPosition().getDirectionTowards(attackPos);

    // Get the cells perpendicular to the attack cell and deal damage.
    const board = this.piece.getBoard();
    this.maybeDealDamage(board.getCellInDirection(attackPos, attackDir.clockwise90()));
    this.maybeDealDamage(board.getCellInDirection(attackPos, attackDir.counterClockwise90()));
  }

  private maybeDealDamage(targetCell: Cell | null): void {
    if (!targetCell || !targetCell.hasPiece()) {
      return;
    }
    const targetPiece = targetCell.getPiece()!;

    // Calculate attack and defense.
    const attack = this.piece.getAttackPowerForAttack_(targetPiece);
    const defense = this.piece.getDefenseForAttack_(targetPiece);

    // Perform the attack.
    if (attack > defense) {
      // Deal damage to the target piece.
      targetPiece.takeDamage_(attack - defense);
    } else {
      // If the attack is <= defense, then each piece takes a damage
      // and knocks back the other piece.
      this.piece.takeDamage_(1);
      targetPiece.takeDamage_(1);
      if (this.piece.armorBreakKnocksBack_()) {
        targetPiece.knockback_(this.piece.getDirection());
      }
    }

    // This is kind of a hack, but need to copy some behavior from Dash and Pull pieces.
    if (this.piece instanceof PullPiece) {
      (this.piece as PullPiece).pullTarget(targetPiece);
    } else if (this.piece instanceof DashPiece) {
      (this.piece as DashPiece).rotateTarget(targetPiece);
    }
    // There is no RamPiece with the Sweep ability, so we don't need to do anything.
    if (this.piece instanceof RamPiece) {
      throw new Error('Sweep is not supported for RamPiece');
    }
  }
}
