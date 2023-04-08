import { AttackCells } from "../attack-cells";
import { Direction } from "../direction";
import { Position } from "../position";
import { Piece } from "./piece";

export class MeleePiece extends Piece {

  getPieceType(): string {
    return 'Melee';
  }

  getPieceTypeDescription(): string {
    return 'Always attacks the first machine in its Attack Range.';
  }

  override getAttackCells_(pos: Position, dir: Direction, rangeRemaining: number): AttackCells {
    const attackCells = new AttackCells();
    if (rangeRemaining == 0) {
      return attackCells;
    }
    const cell = this.getBoard().getCellInDirection(pos, dir);
    // Can't run off the board.
    if (!cell) {
      return attackCells;
    }
    if (cell.hasPiece()) {
      const piece = cell.getPiece()!;
      // Can't attack your own pieces nor can you attack through them.
      if (this.getPlayer().equals(piece.getPlayer())) {
        return attackCells;
      } else {
        // Found a piece to attack.
        attackCells.toAttack.add(cell);
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
}
