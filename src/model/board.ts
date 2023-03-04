import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Cell } from "./cell";
import { Burrower } from "./machine/burrower";
import { Direction } from "./direction";
import { Position } from "./position";
import { Terrain } from "./terrain";

/**
 * Provides the data for the board.
 */
@Injectable()
export class Board {

  static readonly SIZE: number = 8;

  private cells!: Cell[][];

  constructor(@Optional() @SkipSelf() board?: Board) {
    if (board) {
      throw new Error('Singleton violation: Board');
    }

    this.reset();
  }

  reset() {
    this.cells = new Array<Array<Cell>>();
    for (let row = 0; row < Board.SIZE; row++) {
      let rowArr: Cell[] = new Array<Cell>();
      for (let col = 0; col < Board.SIZE; col++) {
        rowArr.push(new Cell(row, col));
      }
      this.cells.push(rowArr);
    }

    this.setBoard2();
  }

  private setBoard3(): void {
    this.getByRowCol(1, 0).terrain = Terrain.MOUNTAIN;
    this.getByRowCol(1, 1).terrain = Terrain.HILL;
    this.getByRowCol(1, 2).terrain = Terrain.FOREST;
    this.getByRowCol(1, 3).terrain = Terrain.GRASSLAND;
    this.getByRowCol(1, 4).terrain = Terrain.MARSH;
    this.getByRowCol(1, 5).terrain = Terrain.CHASM;

    this.getByRowCol(2, 2).terrain = Terrain.CHASM;
    this.getByRowCol(2, 3).terrain = Terrain.MARSH;
    this.getByRowCol(2, 4).terrain = Terrain.GRASSLAND;
    this.getByRowCol(2, 5).terrain = Terrain.FOREST;
    this.getByRowCol(2, 6).terrain = Terrain.HILL;
    this.getByRowCol(2, 7).terrain = Terrain.MOUNTAIN;

    this.getByRowCol(5, 3).terrain = Terrain.MARSH;
    this.getByRowCol(4, 2).terrain = Terrain.FOREST;
  }

  private setBoard1(): void {
    this.getByRowCol(0, 3).terrain = Terrain.FOREST;
    this.getByRowCol(0, 5).terrain = Terrain.FOREST;

    this.getByRowCol(1, 0).terrain = Terrain.FOREST;
    this.getByRowCol(1, 1).terrain = Terrain.FOREST;
    this.getByRowCol(1, 2).terrain = Terrain.MOUNTAIN;
    this.getByRowCol(1, 4).terrain = Terrain.FOREST;
    this.getByRowCol(1, 6).terrain = Terrain.FOREST;

    this.getByRowCol(2, 2).terrain = Terrain.MOUNTAIN;
    this.getByRowCol(2, 3).terrain = Terrain.FOREST;
    this.getByRowCol(2, 4).terrain = Terrain.FOREST;
    this.getByRowCol(2, 6).terrain = Terrain.HILL;
    this.getByRowCol(2, 7).terrain = Terrain.FOREST;

    this.getByRowCol(3, 1).terrain = Terrain.HILL;
    this.getByRowCol(3, 2).terrain = Terrain.FOREST;
    this.getByRowCol(3, 4).terrain = Terrain.HILL;
    this.getByRowCol(3, 6).terrain = Terrain.MOUNTAIN;

    this.getByRowCol(4, 1).terrain = Terrain.MOUNTAIN;
    this.getByRowCol(4, 3).terrain = Terrain.HILL;
    this.getByRowCol(4, 5).terrain = Terrain.FOREST;
    this.getByRowCol(4, 6).terrain = Terrain.HILL;

    this.getByRowCol(5, 0).terrain = Terrain.FOREST;
    this.getByRowCol(5, 1).terrain = Terrain.HILL;
    this.getByRowCol(5, 3).terrain = Terrain.FOREST;
    this.getByRowCol(5, 4).terrain = Terrain.FOREST;
    this.getByRowCol(5, 5).terrain = Terrain.MOUNTAIN;

    this.getByRowCol(6, 1).terrain = Terrain.FOREST;
    this.getByRowCol(6, 3).terrain = Terrain.FOREST;
    this.getByRowCol(6, 5).terrain = Terrain.MOUNTAIN;
    this.getByRowCol(6, 6).terrain = Terrain.FOREST;
    this.getByRowCol(6, 7).terrain = Terrain.FOREST;

    this.getByRowCol(7, 2).terrain = Terrain.FOREST;
    this.getByRowCol(7, 4).terrain = Terrain.FOREST;
  }

  private setBoard2(): void {
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
}
