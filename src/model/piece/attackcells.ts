import { Cell } from "../cell";

/**
 * Encapsulates metadata about a possible attack.
 */
export class AttackCells {

  readonly toAttack = new Set<Cell>();
  readonly inRange = new Set<Cell>();

  constructor() { }

  merge(other: AttackCells): AttackCells {
    other.toAttack.forEach(this.toAttack.add, this.toAttack);
    other.inRange.forEach(this.inRange.add, this.inRange);
    return this;
  }
}