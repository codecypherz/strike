import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Cell } from "./cell";
import { Burrower } from "./piece/burrower";
import { Position } from "./position";
import { Terrain } from "./terrain";

/**
 * Provides the data for the board.
 */
@Injectable()
export class Board {

  static readonly WIDTH: number = 8;
  static readonly HEIGHT: number = 8;

  private cells!: Cell[][];

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

    // Set some terrain
    this.getByRowCol(3, 0).terrain = Terrain.FOREST;
    this.getByRowCol(3, 1).terrain = Terrain.FOREST;
    this.getByRowCol(3, 2).terrain = Terrain.FOREST;
    this.getByRowCol(4, 7).terrain = Terrain.FOREST;
    this.getByRowCol(4, 6).terrain = Terrain.FOREST;
    this.getByRowCol(4, 5).terrain = Terrain.FOREST;

    this.getByRowCol(4, 0).terrain = Terrain.HILL;
    this.getByRowCol(4, 1).terrain = Terrain.HILL;
    this.getByRowCol(3, 7).terrain = Terrain.HILL;
    this.getByRowCol(3, 6).terrain = Terrain.HILL;

    this.getByRowCol(5, 0).terrain = Terrain.MOUNTAIN;
    this.getByRowCol(2, 7).terrain = Terrain.MOUNTAIN;

    this.getByRowCol(2, 3).terrain = Terrain.CHASM;
    this.getByRowCol(2, 4).terrain = Terrain.CHASM;
    this.getByRowCol(5, 3).terrain = Terrain.CHASM;
    this.getByRowCol(5, 4).terrain = Terrain.CHASM;

    this.getByRowCol(0, 7).terrain = Terrain.MARSH;
    this.getByRowCol(1, 6).terrain = Terrain.MARSH;
    this.getByRowCol(2, 5).terrain = Terrain.MARSH;
    this.getByRowCol(3, 4).terrain = Terrain.MARSH;
    this.getByRowCol(4, 3).terrain = Terrain.MARSH;
    this.getByRowCol(5, 2).terrain = Terrain.MARSH;
    this.getByRowCol(6, 1).terrain = Terrain.MARSH;
    this.getByRowCol(7, 0).terrain = Terrain.MARSH;
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
