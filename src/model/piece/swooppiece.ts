import { AttackCells } from "../attackcells";
import { Cell } from "../cell";
import { Direction } from "../direction";
import { Position } from "../position";
import { Piece } from "./piece";

export class SwoopPiece extends Piece {

  getPieceType(): string {
    return 'Swoop';
  }

  getPieceTypeDescription(): string {
    return 'Always attacks the first machine in its Attack Range ' +
      'and moves next to it. Gains <buff>+1</buff> Combat Power on all terrains ' +
      'and can ignore all terrain penalties.';
  }

  override canMoveThroughChasm_(): boolean {
    return true;
  }

  override mustStopMoveInMarsh_(): boolean {
    return false;
  }

  override getAttackPower(cell: Cell): number {
    // Swoop type gain +1 power no matter the terrain.
    return this.attackPower + 1;
  }

  override getDefense(cell: Cell): number {
    // Swoop type gain +1 power no matter the terrain.
    return 1;
  }

  override getAttackCells_(
    pos: Position, dir: Direction, rangeRemaining: number): AttackCells {

    const attackCells = new AttackCells();

    if (rangeRemaining == 0) {
      // Base case.
      return attackCells;
    }
    const cell = this.board.getCellInDirection(pos, dir);

    if (!cell) {
      // Can't run off the board.
      return attackCells;
    }

    if (cell.hasPiece()) {
      const piece = cell.getPiece()!;
      // Can't attack your own pieces nor can you attack through them.
      if (this.player.equals(piece.player)) {
        return attackCells;
      } else {
        // Found a piece to attack.
        attackCells.toAttack.add(cell);

        // A swoop piece moves to the cell next to the one it is attacking.
        const finishingCell = this.board.getCell(pos);
        if (!this.getPosition().equals(pos)) {
          attackCells.setFinishingCell(finishingCell);
        }
        return attackCells;
      }
    }
    // This cell is attackable, but there's nothing there.
    attackCells.inRange.add(cell);

    // Keep looking for something to attack at the new point, but with reduced range.
    // Recurse.
    return attackCells.merge(
      this.getAttackCells_(cell.position, dir, rangeRemaining - 1));
  }

  override attack(): AttackCells {
    const attackCells = super.attack();

    // Place the piece in the finishing cell.
    if (!this.isStagedAttack() && attackCells.hasFinishingCell()) {
      const finishingCell = attackCells.getFinishingCell()!;
      finishingCell.setPiece(this);
      this.position = finishingCell.position;
    }

    return attackCells;
  }
}
