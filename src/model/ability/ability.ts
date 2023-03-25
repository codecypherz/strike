import { Cell } from "../cell";
import { AttackResults } from "../piece/attack-results";
import { Piece } from "../piece/piece";
import { Position } from "../position";

export abstract class Ability {

  constructor(public piece: Piece) {}

  abstract getAbilityName(): string;
  abstract getAbilityDescription(): string;

  modifyAttackPower(attackPower: number, cell: Cell): number {
    // Attack power is not modified by default.
    return attackPower;
  }

  modifyDefense(defense: number, cell: Cell): number {
    // Defense is not modified by default.
    return defense;
  }

  takeStartOfTurnAction(): void {
    // Do nothing by default.
  }

  /**
   * Lets the attacking piece perform some ability.
   */
  takeEndOfAttackAction(attackResults: AttackResults): void {
    // Do nothing by default.
  }

  /**
   * Lets the piece being attacked perform some ability.
   */
  takeActionAfterBeingAttacked(attackingPiece: Piece): void {
    // Do nothing by default.
  }

  getCellsInRange_(pos: Position, rangeRemaining: number): Set<Cell> {
    const board = this.piece.getBoard();
    const cells = new Set<Cell>();
    
    // Base case
    if (rangeRemaining == 0) {
      return cells;
    }

    // Add the surrounding cells.
    for (let cell of board.getSurroundingCells(pos)) {
      cells.add(cell);

      // Recurse with reduced ranged.
      const moreCells = this.getCellsInRange_(cell.position, rangeRemaining - 1);
      moreCells.forEach(cells.add, cells);
    }
    
    return cells;
  }
}
