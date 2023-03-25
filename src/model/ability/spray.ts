import { Board } from "../board";
import { Cell } from "../cell";
import { Position } from "../position";
import { Ability } from "./ability";

export class Spray extends Ability {

  getAbilityName(): string {
    return 'Spray';
  }

  getAbilityDescription(): string {
    return 'All machines in attack range <debuff>lose 1 HP</debuff>, ' +
      'friend or foe, during the start of every turn.';
  }

  override takeStartOfTurnAction(): void {
    // Get all cells in attack range.
    const sprayCells = this.getSprayCells(
        this.piece.getBoard(), this.piece.position, this.piece.attackRange);

    // Damage every piece you find.
    for (let cell of sprayCells) {
      if (cell.hasPiece()) {
        const piece = cell.getPiece()!;
        // Make sure you don't hurt yourself.
        if (piece != this.piece) {
          piece.takeDamage_(1);
        }
      }
    }
  }

  private getSprayCells(board: Board, pos: Position, rangeRemaining: number): Set<Cell> {
    const cells = new Set<Cell>();
    
    // Base case
    if (rangeRemaining == 0) {
      return cells;
    }

    // Add the surrounding cells.
    for (let cell of board.getSurroundingCells(pos)) {
      cells.add(cell);

      // Recurse with reduced ranged.
      const moreCells = this.getSprayCells(board, cell.position, rangeRemaining - 1);
      moreCells.forEach(cells.add, cells);
    }
    
    return cells;
  }
}
