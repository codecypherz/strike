import { getOnly } from "src/util/sets";
import { AttackCells } from "../attack-cells";
import { Cell } from "../cell";
import { Terrain } from "../terrain";
import { Piece } from "./piece";

export class PullPiece extends Piece {

  getPieceType(): string {
    return 'Pull';
  }

  getPieceTypeDescription(): string {
    return 'Always attacks the first machine in its Attack Range ' +
        'and pulls the enemy one terrain closer to it. Gains <buff>+1</buff> Combat ' +
        'Power while on Marsh terrain and can traverse through it ' +
        'without hindering its movement.';
  }

  override mustStopMoveInMarsh_(): boolean {
    return false;
  }

  override getAttackPower(cell: Cell): number {
    if (cell.terrain == Terrain.MARSH) {
      return this.attackPower + 1;
    }
    return this.attackPower + cell.terrain.elevation;
  }

  override getDefense(cell: Cell): number {
    if (cell.terrain == Terrain.MARSH) {
      return 1;
    }
    return cell.terrain.elevation;
  }

  override attack(): AttackCells {
    const attackCells = super.attack();
    if (!this.hasConfirmableAttack_(attackCells)) {
      return attackCells;
    }

    const targetCell = getOnly(attackCells.toAttack);
    if (!targetCell.hasPiece()) {
      return attackCells;
    }
    const targetPiece = targetCell.getPiece()!;

    // Pull the target one closer, if possible.
    const pullDir = this.getDirection().opposite();
    const pullCell = this.getBoard().getCellInDirection(targetCell.position, pullDir);
    if (pullCell == null) {
      throw new Error('Pull cell should not be null.');
    }

    targetPiece.stagedPullDirection = pullDir;
    if (pullCell.hasPiece()) {
      // Cell has a piece, so deal 1 damage to each piece.
      pullCell.getPiece()!.takeDamage_(1);
      targetPiece.takeDamage_(1);
    } else {
      // Empty cell, so just pull the target into the cell.
      if (!this.isStagedAttack()) {
        targetCell.clearPiece();
        pullCell.setPiece(targetPiece);
        targetPiece.position = pullCell.position;
      }
    }

    return attackCells;
  }

  override armorBreakKnocksBack_(): boolean {
    // Pull pieces never knockback. Pull always overrides.
    return false;
  }
}
