import { AttackCells } from "../attack-cells";
import { AttackResults } from "./attack-results";
import { Piece } from "./piece";

export class RamPiece extends Piece {

  getPieceType(): string {
    return 'Ram';
  }

  getPieceTypeDescription(): string {
    return 'Always attacks the first machine in its Attack Range ' +
      'and knocks it backwards. It will then move onto the ' +
      'terrain left behind by the opposing machine.';
  }

  override attack(): AttackCells {
    // Determine the piece and cell being attacked.
    const attackCells = this.getAttackCells();
    if (!this.hasConfirmableAttack_(attackCells)) {
      return attackCells;
    }
    if (attackCells.toAttack.size != 1) {
      // Base piece does not support attacking more than 1 piece at a time.
      throw new Error('This piece only supports attacking 1 piece at a time');
    }
    const targetCell = Array.from(attackCells.toAttack)[0];
    if (!targetCell.hasPiece()) {
      throw new Error('This piece only attacks other pieces');
    }
    const targetPiece = targetCell.getPiece()!;
    const attackResults = new AttackResults();
    attackResults.addAttackedPiece(targetPiece, targetPiece.position);

    // Maybe update some movement since that can be combined with the attack.
    this.confirmMovementIfNotStaged_();

    // Calculate attack and defense.
    const attack = this.getAttackPowerForAttack_(targetPiece);
    const defense = this.getDefenseForAttack_(targetPiece);

    // Perform the attack.
    if (attack > defense) {
      // Deal damage to the target piece.
      targetPiece.takeDamage_(attack - defense);
    } else {
      // If the attack is <= defense, then each piece takes 1 extra damage.
      this.takeDamage_(1);
      targetPiece.takeDamage_(1);
    }

    // Always knockback the target.
    const oldTargetPieceCell = targetPiece.getCell();
    const knockedBack = targetPiece.knockback_(this.getDirection());

    // If the piece got knocked back, move into that cell.
    if (knockedBack && !this.isStagedAttack()) {
      this.getCell().clearPiece();
      oldTargetPieceCell.setPiece(this);
      this.position = oldTargetPieceCell.position;
    }

    this.takeEndOfAttackAction_(attackResults);
    this.confirmAttackIfNotStaged_();
    return attackCells;
  }
}
