import { Board } from "../board";
import { Cell } from "../cell";
import { Position } from "../position";
import { Direction } from "./direction";
import { Piece } from "./piece";

export class GunnerPiece extends Piece {

  getPieceType(): string {
    return 'Gunner';
  }

  getPieceTypeDescription(): string {
    return 'Attacks at the maximum of its Attack Range at all times.'
  }

  override getAttackCells_(board: Board, pos: Position, dir: Direction, rangeRemaining: number): Set<Cell> {
    let cells = new Set<Cell>();
    if (rangeRemaining == 0) {
      return cells;
    }
    const cell = board.getCellInDirection(pos, dir);
    // Can't run off the board.
    if (!cell) {
      return cells;
    }
    if (cell.hasPiece()) {
      const piece = cell.getPiece()!;
      // Can't attack your own piece, but you *can* shoot through them.
      if (!this.player.equals(piece.player)) {
        // Found a piece to attack, but it needs to be at max range to count.
        if (rangeRemaining == 1) {
          // We are at the end of our range, so add it.
          cells.add(cell);
          // No need to search further.
          return cells;
        }
      }
    } else if (rangeRemaining == 1) {
      // This cell is attackable, but there's nothing there.
      cells.add(cell);
      // No need to search further.
      return cells;
    }
    // Keep looking for something to attack at the new point, but with reduced range.
    // Recurse.
    let subsequentCells = this.getAttackCells_(board, cell.position, dir, rangeRemaining - 1);
    subsequentCells.forEach(cells.add, cells);
    return cells;
  }
}
