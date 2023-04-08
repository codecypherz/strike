import { Direction } from "./direction";

export class Position {
  readonly row: number;
  readonly col: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  static from(row: number, col: number): Position {
    return new Position(row, col);
  }

  equals(other: Position | null | undefined): boolean {
    if (!other) {
      return false;
    }
    return this.row == other.row && this.col == other.col;
  }

  toString(): string {
    return '(' + this.row + ',' + this.col + ')';
  }

  mirror(): Position {
    return new Position(7 - this.row, 7 - this.col);
  }

  getDirectionTowards(target: Position): Direction {
    if (target.row < this.row) {
      if (target.col != this.col) {
        throw new Error('Cannot handle diagonal direction finding');
      }
      return Direction.UP;
    } else if (target.row > this.row) {
      if (target.col != this.col) {
        throw new Error('Cannot handle diagonal direction finding');
      }
      return Direction.DOWN;
    } else if (target.col < this.col) {
      if (target.row != this.row) {
        throw new Error('Cannot handle diagonal direction finding');
      }
      return Direction.LEFT;
    } else if (target.col > this.col) {
      if (target.row != this.row) {
        throw new Error('Cannot handle diagonal direction finding');
      }
      return Direction.RIGHT;
    }
    throw new Error('Unable to determine direction towards target');
  }
}
