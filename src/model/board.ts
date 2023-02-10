import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Cell } from "./cell";
import { Burrower } from "./piece/burrower";
import { Position } from "./position";

/**
 * Provides the data for the board.
 */
@Injectable()
export class Board {

  static readonly WIDTH: number = 8;
  static readonly HEIGHT: number = 8;

  private cells: Cell[][];

  constructor(@Optional() @SkipSelf() board?: Board) {
    if (board) {
      throw new Error('Singleton violation: Board');
    }

    this.reset();
  }

  reset() {
    this.cells = new Array<Array<Cell>>();
    for (let row = 0; row < Board.HEIGHT; row++) {
      let rowArr: Cell[] = new Array<Cell>();
      for (let col = 0; col < Board.WIDTH; col++) {
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

  getWidth() {
    return Board.WIDTH;
  }

  getHeight() {
    return Board.HEIGHT;
  }
}
