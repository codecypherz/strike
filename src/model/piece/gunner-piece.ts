import { AttackCells } from "../attack-cells";
import { Direction } from "../direction";
import { Position } from "../position";
import { Piece } from "./piece";

export class GunnerPiece extends Piece {

  getPieceType(): string {
    return 'Gunner';
  }

  getPieceTypeDescription(): string {
    return 'Always attacks at the maximum of its Attack Range.';
  }

  override getAttackCells_(
    pos: Position, dir: Direction, rangeRemaining: number): AttackCells {

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
      // Can't attack your own piece, but you *can* shoot through them.
      if (!this.getPlayer().equals(piece.getPlayer())) {
        // Found a piece to attack, but it needs to be at max range to count.
        if (rangeRemaining == 1) {
          // We are at the end of our range, so add it.
          attackCells.toAttack.add(cell);
          // No need to search further.
          return attackCells;
        }
      }
    } else if (rangeRemaining == 1) {
      // This cell is attackable, but there's nothing there.
      attackCells.inRange.add(cell);
      return attackCells;
    }
    // Keep looking for something to attack at the new point, but with reduced range.
    // Recurse.
    return attackCells.merge(
      this.getAttackCells_(cell.position, dir, rangeRemaining - 1));
  }
}
