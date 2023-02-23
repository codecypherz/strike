import { Board } from "../board";
import { Cell } from "../cell";
import { Position } from "../position";
import { Direction } from "./direction";
import { Piece } from "./piece";

export class MeleePiece extends Piece {

  getPieceType(): string {
    return 'Melee';
  }

  getPieceTypeDescription(): string {
    return 'Strikes the first piece in its Attack Range.';
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
      // Can't attack your own pieces nor can you attack through them.
      if (this.player.equals(piece.player)) {
        return cells;
      } else {
        // Found a piece to attack, no need to search further.
        cells.add(cell);
        return cells;
      }
    }
    // This cell is attackable, but there's nothing there.
    cells.add(cell);
    // Keep looking for something to attack at the new point, but with reduced range.
    // Recurse.
    let subsequentCells = this.getAttackCells_(board, cell.position, dir, rangeRemaining - 1);
    subsequentCells.forEach(cells.add, cells);
    return cells;
  }
}