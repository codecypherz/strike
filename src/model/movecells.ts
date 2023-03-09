import { Cell } from "./cell";

/**
 * Encapsulates metadata about a possible move.
 */
export class MoveCells {

  private moveable = new Set<Cell>();
  private sprintable = new Set<Cell>();

  constructor() { }

  merge(other: MoveCells): MoveCells {
    other.moveable.forEach(this.addMoveable, this);
    other.sprintable.forEach(this.addSprintable, this);
    return this;
  }

  addSprintable(cell: Cell): void {
    // Sprintable can only be added if it's not moveable.
    if (!this.moveable.has(cell)) {
      this.sprintable.add(cell);
    }
  }

  getSprintableCells(): Set<Cell> {
    return this.sprintable;
  }

  hasSprintable(cell: Cell): boolean {
    return this.sprintable.has(cell);
  }

  addMoveable(cell: Cell): void {
    // Adding a moveable is an upgrade from sprintable.
    if (this.sprintable.has(cell)) {
      this.sprintable.delete(cell);
    }
    this.moveable.add(cell);
  }

  getMoveableCells(): Set<Cell> {
    return this.moveable;
  }

  hasMoveable(cell: Cell): boolean {
    return this.moveable.has(cell);
  }

  hasMoveableOrSprintable(cell: Cell): boolean {
    return this.moveable.has(cell) || this.sprintable.has(cell);
  }

  hasAnyCells(): boolean {
    return this.moveable.size > 0 || this.sprintable.size > 0;
  }
}
