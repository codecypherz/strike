import { Injectable } from "@angular/core";
import { Cell } from "./cell";

/**
 * Provides the data for the board.
 */
@Injectable({ providedIn: 'root' })
export class BoardService {

  static readonly WIDTH: number = 8;
  static readonly HEIGHT: number = 8;

  private cells: Cell[][];

  constructor() {
    this.cells = new Array<Array<Cell>>();
    for (let row = 0; row < BoardService.HEIGHT; row++) {
      let rowArr: Cell[] = new Array<Cell>();
      for (let col = 0; col < BoardService.WIDTH; col++) {
        rowArr.push(new Cell());
      }
      this.cells.push(rowArr);
    }
  }

  getCells(): Cell[][] {
    return this.cells;
  }

  getCell(row: number, col: number): Cell {
    return this.cells[row][col];
  }

  getWidth() {
    return BoardService.WIDTH;
  }

  getHeight() {
    return BoardService.HEIGHT;
  }
}
