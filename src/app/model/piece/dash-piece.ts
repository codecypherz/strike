import { AttackCells } from "../attack-cells";
import { Direction } from "../direction";
import { Position } from "../position";
import { Terrain } from "../terrain";
import { AttackResults } from "./attack-results";
import { Piece } from "./piece";


export class DashPiece extends Piece {

  getPieceType(): string {
    return 'Dash';
  }

  getPieceTypeDescription(): string {
    return 'Always moves to the end of its Attack Range and ' +
      'damages every machine in its path, including your own, ' +
      'and rotates them 180 degrees. It must have an empty terrain ' +
      'to land on at the end of its Attack Range in order to attack.';
  }

  override getAttackCells_(
    pos: Position, dir: Direction, rangeRemaining: number): AttackCells {

    const attackCells = new AttackCells();

    if (rangeRemaining == 0) {
      // Base case.
      return attackCells;
    }
    const cell = this.getBoard().getCellInDirection(pos, dir);

    if (!cell) {
      // Can't run off the board.
      return attackCells;
    }

    if (cell.terrain == Terrain.CHASM) {
      // None of the found cells can be a chasm.
      return attackCells;
    }

    if (rangeRemaining == 1) {
      // This cell is the finishing cell.
      if (!cell.hasPiece()) {
        // ... but you can't finish in an occupied cell.
        attackCells.setFinishingCell(cell);
      }
      return attackCells;
    }

    // Every cell in its path will be attacked.
    if (cell.hasPiece()) {
      attackCells.toAttack.add(cell);
    } else {
      attackCells.inRange.add(cell);
    }

    // Keep looking for something to attack at the new point, but with reduced range.
    // Recurse.
    return attackCells.merge(
      this.getAttackCells_(cell.position, dir, rangeRemaining - 1));
  }

  override hasConfirmableAttack_(attackCells: AttackCells): boolean {
    return attackCells.toAttack.size > 0 &&
      attackCells.hasFinishingCell() &&
      !attackCells.getFinishingCell()!.hasPiece();
  }

  override attack(): AttackCells {
    const attackCells = this.getAttackCells();
    if (!this.hasConfirmableAttack_(attackCells)) {
      return attackCells;
    }
    if (attackCells.toAttack.size == 0) {
      throw new Error('Cannot perform attack without something to attack.');
    }
    if (!attackCells.hasFinishingCell()) {
      throw new Error('Must have a finishing cell to attack.');
    }

    // Maybe update some movement since that can be combined with the attack.
    this.confirmMovementIfNotStaged_();

    // Perform the attack.
    const attackResults = new AttackResults();
    for (let cellToAttack of attackCells.toAttack) {
      if (!cellToAttack.hasPiece()) {
        throw new Error('Cell to attack did not have a piece.');
      }
      const targetPiece = cellToAttack.getPiece()!;
      attackResults.addAttackedPiece(targetPiece, targetPiece.position);

      // Calculate attack and defense.
      // This calculation needs to happen before rotating the target piece.
      const attack = this.getAttackPowerForAttack_(targetPiece);
      const defense = this.getDefenseForAttack_(targetPiece);

      // Deal damage, if you can.
      if (attack > defense) {
        targetPiece.takeDamage_(attack - defense);
      } else {
        // This is armor break. In the case of dash + armor break, it is always 2 damage.
        // This is because the dash through happens before the knockback.
        // The knockback is in the direction of the dash therefore hitting into the final spot.
        this.takeDamage_(2);
        targetPiece.takeDamage_(2);
        targetPiece.stagedKnockbackDirection = this.getDirection();
      }

      this.rotateTarget(targetPiece);
    }

    // If not staged, move to finishing cell.
    if (!this.isStagedAttack()) {
      const finishingCell = attackCells.getFinishingCell()!;
      finishingCell.setPiece(this);
      this.position = finishingCell.position;
    }

    this.takeEndOfAttackAction_(attackResults);
    this.confirmAttackIfNotStaged_();
    return attackCells;
  }

  rotateTarget(targetPiece: Piece): void {
      // If not staged, finalize rotation of target.
      if (!this.isStagedAttack()) {
        // TODO: Give rotation indicator?
        targetPiece.rotate180();
      }
  }
}
