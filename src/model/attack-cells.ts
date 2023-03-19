import { Cell } from "./cell";

/**
 * Encapsulates metadata about a possible attack.
 */
export class AttackCells {

  readonly toAttack = new Set<Cell>();
  readonly inRange = new Set<Cell>();
  private finishingCell: Cell | null = null;

  constructor() { }

  merge(other: AttackCells): AttackCells {
    other.toAttack.forEach(this.toAttack.add, this.toAttack);
    other.inRange.forEach(this.inRange.add, this.inRange);
    if (other.finishingCell) {
      this.setFinishingCell(other.finishingCell);
    }
    return this;
  }

  setFinishingCell(cell: Cell): void {
    if (!cell) {
      throw new Error('Cannot set finishing cell to null.');
    }
    if (this.finishingCell) {
      throw new Error('Cannot overwrite finishing cell.');
    }
    this.finishingCell = cell;
  }

  hasFinishingCell(): boolean {
    return this.finishingCell != null;
  }
  
  getFinishingCell(): Cell | null {
    return this.finishingCell;
  }
}