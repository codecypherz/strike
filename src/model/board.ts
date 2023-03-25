import { v4 as uuidv4 } from 'uuid';
import { Cell } from "./cell";
import { Direction } from "./direction";
import { Position } from "./position";
import { Terrain } from "./terrain";

/**
 * Provides the data for the board.
 */
export class Board {

  static readonly SIZE: number = 8;

  public id = uuidv4();
  private cells!: Cell[][];

  constructor() {
    this.cells = new Array<Array<Cell>>();
    for (let row = 0; row < Board.SIZE; row++) {
      let rowArr: Cell[] = new Array<Cell>();
      for (let col = 0; col < Board.SIZE; col++) {
        rowArr.push(new Cell(row, col));
      }
      this.cells.push(rowArr);
    }
  }

  getCells(): Cell[][] {
    return this.cells;
  }

  getByRowCol(row: number, col: number): Cell {
    return this.cells[row][col];
  }

  getCell(position: Position): Cell {
    return this.getByRowCol(position.row, position.col);
  }

  getSurroundingCells(pos: Position): Array<Cell> {
    const cells = new Array<Cell>();
    if (pos.row > 0) {
      cells.push(this.getByRowCol(pos.row - 1, pos.col));
    }
    if (pos.row < Board.SIZE - 1) {
      cells.push(this.getByRowCol(pos.row + 1, pos.col));
    }
    if (pos.col > 0) {
      cells.push(this.getByRowCol(pos.row, pos.col - 1));
    }
    if (pos.col < Board.SIZE - 1) {
      cells.push(this.getByRowCol(pos.row, pos.col + 1));
    }
    return cells;
  }

  getCellInDirection(pos: Position, dir: Direction): Cell | null {
    if (dir == Direction.UP && pos.row > 0) {
      return this.getByRowCol(pos.row - 1, pos.col);
    } else if (dir == Direction.DOWN && pos.row < Board.SIZE - 1) {
      return this.getByRowCol(pos.row + 1, pos.col);
    } else if (dir == Direction.LEFT && pos.col > 0) {
      return this.getByRowCol(pos.row, pos.col - 1);
    } else if (dir == Direction.RIGHT && pos.col < Board.SIZE - 1) {
      return this.getByRowCol(pos.row, pos.col + 1);
    }
    return null;
  }

  clearStagedAttackData(): void {
    for (let cell of this.getCells().flat()) {
      if (cell.hasPiece()) {
        cell.getPiece()!.clearStagedAttackData();
      }
    }
  }

  clearTurnData(): void {
    for (let cell of this.getCells().flat()) {
      cell.selected = false;
      if (cell.hasPiece()) {
        cell.getPiece()!.clearTurnData();
      }
    }
  }

  setLastPieceData(): void {
    for (let cell of this.getCells().flat()) {
      cell.selected = false;
      if (cell.hasPiece()) {
        cell.getPiece()!.setLastPieceData();
      }
    }
  }

  setAllTerrain(terrain: Terrain) {
    for (let cell of this.getCells().flat()) {
      cell.terrain = terrain;
    }
  }
}
