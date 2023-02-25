import { Board } from "../board";
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

  override attack(board: Board): void {
    // Determine the piece and cell being attacked.
    const attackCells = this.getAttackCells(board);
    if (!this.hasConfirmableAttack_(attackCells)) {
      return;
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

    // Maybe update some movement since that can be combined with the attack.
    this.confirmMovementIfNotStaged_();

    // Calculate attack and defense.
    const attack = this.getAttackPowerForAttack_(board, targetPiece);
    const defense = this.getDefenseForAttack_(board, targetPiece);

    // Perform the attack.
    if (attack > defense) {
      // Deal damage to the target piece.
      targetPiece.takeDamage_(attack - defense, board);
    }
    // Always knockback the target.
    const oldTargetPieceCell = targetPiece.getCell(board);
    const knockedBack = targetPiece.knockback_(this.getDirection(), board);

    if (knockedBack && !this.isStagedAttack()) {
      this.getCell(board).clearPiece();
      oldTargetPieceCell.setPiece(this);
      this.position = oldTargetPieceCell.position;
    }

    this.activatePieceIfNotStaged_();
  }
}
