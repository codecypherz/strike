import { Injectable } from "@angular/core";
import { Cell } from "./cell";
import { Burrower } from "./piece/burrower";

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

    // TODO: Remove this hard-coded data.
    this.getCell(0, 3).setPiece(new Burrower());
    this.getCell(7, 4).setPiece(new Burrower());
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
