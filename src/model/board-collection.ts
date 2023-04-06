import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Position } from "./position";
import { Terrain } from "./terrain";

/**
 * This is the collection of pre-made boards to choose from.
 */
@Injectable()
export class BoardCollection {

  constructor(@Optional() @SkipSelf() service: BoardCollection) {
    if (service) {
      throw new Error('Singleton violation: BoardCollection');
    }
  }

  createBoard1() {
    const board = new Board();

    board.getByRowCol(0, 0).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 1).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 2).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 3).terrain = Terrain.FOREST;
    board.getByRowCol(0, 4).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 5).terrain = Terrain.FOREST;
    board.getByRowCol(0, 6).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 7).terrain = Terrain.GRASSLAND;

    board.getByRowCol(1, 0).terrain = Terrain.FOREST;
    board.getByRowCol(1, 1).terrain = Terrain.FOREST;
    board.getByRowCol(1, 2).terrain = Terrain.MOUNTAIN;
    board.getByRowCol(1, 3).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 4).terrain = Terrain.FOREST;
    board.getByRowCol(1, 5).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 6).terrain = Terrain.FOREST;
    board.getByRowCol(1, 7).terrain = Terrain.GRASSLAND;

    board.getByRowCol(2, 0).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 1).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 2).terrain = Terrain.MOUNTAIN;
    board.getByRowCol(2, 3).terrain = Terrain.FOREST;
    board.getByRowCol(2, 4).terrain = Terrain.FOREST;
    board.getByRowCol(2, 5).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 6).terrain = Terrain.FOREST;
    board.getByRowCol(2, 7).terrain = Terrain.FOREST;

    board.getByRowCol(3, 0).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 1).terrain = Terrain.HILL;
    board.getByRowCol(3, 2).terrain = Terrain.FOREST;
    board.getByRowCol(3, 3).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 4).terrain = Terrain.HILL;
    board.getByRowCol(3, 5).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 6).terrain = Terrain.MOUNTAIN;
    board.getByRowCol(3, 7).terrain = Terrain.GRASSLAND;

    this.mirrorToOtherSide(board);

    return board;
  }

  createBoard2(): Board {
    const board = new Board();

    board.getByRowCol(0, 0).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 1).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 2).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 3).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 4).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 5).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 6).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 7).terrain = Terrain.MARSH;

    board.getByRowCol(1, 0).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 1).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 2).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 3).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 4).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 5).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 6).terrain = Terrain.MARSH;
    board.getByRowCol(1, 7).terrain = Terrain.GRASSLAND;

    board.getByRowCol(2, 0).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 1).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 2).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 3).terrain = Terrain.CHASM;
    board.getByRowCol(2, 4).terrain = Terrain.CHASM;
    board.getByRowCol(2, 5).terrain = Terrain.MARSH;
    board.getByRowCol(2, 6).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 7).terrain = Terrain.MOUNTAIN;

    board.getByRowCol(3, 0).terrain = Terrain.FOREST;
    board.getByRowCol(3, 1).terrain = Terrain.FOREST;
    board.getByRowCol(3, 2).terrain = Terrain.FOREST;
    board.getByRowCol(3, 3).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 4).terrain = Terrain.MARSH;
    board.getByRowCol(3, 5).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 6).terrain = Terrain.HILL;
    board.getByRowCol(3, 7).terrain = Terrain.HILL;

    this.mirrorToOtherSide(board);

    return board;
  }

  createBoard3(): Board {
    const board = new Board();

    board.getByRowCol(0, 0).terrain = Terrain.FOREST;
    board.getByRowCol(0, 1).terrain = Terrain.FOREST;
    board.getByRowCol(0, 2).terrain = Terrain.FOREST;
    board.getByRowCol(0, 3).terrain = Terrain.FOREST;
    board.getByRowCol(0, 4).terrain = Terrain.HILL;
    board.getByRowCol(0, 5).terrain = Terrain.MOUNTAIN;
    board.getByRowCol(0, 6).terrain = Terrain.MOUNTAIN;
    board.getByRowCol(0, 7).terrain = Terrain.MOUNTAIN;

    board.getByRowCol(1, 0).terrain = Terrain.FOREST;
    board.getByRowCol(1, 1).terrain = Terrain.FOREST;
    board.getByRowCol(1, 2).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 3).terrain = Terrain.FOREST;
    board.getByRowCol(1, 4).terrain = Terrain.HILL;
    board.getByRowCol(1, 5).terrain = Terrain.HILL;
    board.getByRowCol(1, 6).terrain = Terrain.MOUNTAIN;
    board.getByRowCol(1, 7).terrain = Terrain.MOUNTAIN;

    board.getByRowCol(2, 0).terrain = Terrain.MARSH;
    board.getByRowCol(2, 1).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 2).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 3).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 4).terrain = Terrain.FOREST;
    board.getByRowCol(2, 5).terrain = Terrain.HILL;
    board.getByRowCol(2, 6).terrain = Terrain.HILL;
    board.getByRowCol(2, 7).terrain = Terrain.MARSH;

    board.getByRowCol(3, 0).terrain = Terrain.MARSH;
    board.getByRowCol(3, 1).terrain = Terrain.CHASM;
    board.getByRowCol(3, 2).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 3).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 4).terrain = Terrain.FOREST;
    board.getByRowCol(3, 5).terrain = Terrain.MARSH;
    board.getByRowCol(3, 6).terrain = Terrain.MARSH;
    board.getByRowCol(3, 7).terrain = Terrain.MARSH;

    this.mirrorToOtherSide(board);

    return board;
  }

  createBoard4(): Board {
    const board = new Board();

    board.getByRowCol(0, 0).terrain = Terrain.MARSH;
    board.getByRowCol(0, 1).terrain = Terrain.CHASM;
    board.getByRowCol(0, 2).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 3).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 4).terrain = Terrain.CHASM;
    board.getByRowCol(0, 5).terrain = Terrain.MARSH;
    board.getByRowCol(0, 6).terrain = Terrain.MOUNTAIN;
    board.getByRowCol(0, 7).terrain = Terrain.GRASSLAND;

    board.getByRowCol(1, 0).terrain = Terrain.HILL;
    board.getByRowCol(1, 1).terrain = Terrain.MOUNTAIN;
    board.getByRowCol(1, 2).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 3).terrain = Terrain.HILL;
    board.getByRowCol(1, 4).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 5).terrain = Terrain.FOREST;
    board.getByRowCol(1, 6).terrain = Terrain.MARSH;
    board.getByRowCol(1, 7).terrain = Terrain.HILL;

    board.getByRowCol(2, 0).terrain = Terrain.FOREST;
    board.getByRowCol(2, 1).terrain = Terrain.FOREST;
    board.getByRowCol(2, 2).terrain = Terrain.HILL;
    board.getByRowCol(2, 3).terrain = Terrain.HILL;
    board.getByRowCol(2, 4).terrain = Terrain.HILL;
    board.getByRowCol(2, 5).terrain = Terrain.MARSH;
    board.getByRowCol(2, 6).terrain = Terrain.CHASM;
    board.getByRowCol(2, 7).terrain = Terrain.MOUNTAIN;

    board.getByRowCol(3, 0).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 1).terrain = Terrain.MARSH;
    board.getByRowCol(3, 2).terrain = Terrain.MARSH;
    board.getByRowCol(3, 3).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 4).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 5).terrain = Terrain.MARSH;
    board.getByRowCol(3, 6).terrain = Terrain.MOUNTAIN;
    board.getByRowCol(3, 7).terrain = Terrain.GRASSLAND;

    this.mirrorToOtherSide(board);

    return board;
  }

  createBoard5(): Board {
    const board = new Board();

    board.getByRowCol(0, 0).terrain = Terrain.FOREST;
    board.getByRowCol(0, 1).terrain = Terrain.FOREST;
    board.getByRowCol(0, 2).terrain = Terrain.FOREST;
    board.getByRowCol(0, 3).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 4).terrain = Terrain.FOREST;
    board.getByRowCol(0, 5).terrain = Terrain.FOREST;
    board.getByRowCol(0, 6).terrain = Terrain.FOREST;
    board.getByRowCol(0, 7).terrain = Terrain.FOREST;

    board.getByRowCol(1, 0).terrain = Terrain.FOREST;
    board.getByRowCol(1, 1).terrain = Terrain.FOREST;
    board.getByRowCol(1, 2).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 3).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 4).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 5).terrain = Terrain.FOREST;
    board.getByRowCol(1, 6).terrain = Terrain.FOREST;
    board.getByRowCol(1, 7).terrain = Terrain.FOREST;

    board.getByRowCol(2, 0).terrain = Terrain.HILL;
    board.getByRowCol(2, 1).terrain = Terrain.HILL;
    board.getByRowCol(2, 2).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 3).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 4).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 5).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 6).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 7).terrain = Terrain.FOREST;

    board.getByRowCol(3, 0).terrain = Terrain.FOREST;
    board.getByRowCol(3, 1).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 2).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 3).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 4).terrain = Terrain.FOREST;
    board.getByRowCol(3, 5).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 6).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 7).terrain = Terrain.GRASSLAND;

    this.mirrorToOtherSide(board);

    return board;
  }

  createBoard6(): Board {
    const board = new Board();

    board.getByRowCol(0, 0).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 1).terrain = Terrain.FOREST;
    board.getByRowCol(0, 2).terrain = Terrain.FOREST;
    board.getByRowCol(0, 3).terrain = Terrain.FOREST;
    board.getByRowCol(0, 4).terrain = Terrain.FOREST;
    board.getByRowCol(0, 5).terrain = Terrain.HILL;
    board.getByRowCol(0, 6).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 7).terrain = Terrain.GRASSLAND;

    board.getByRowCol(1, 0).terrain = Terrain.FOREST;
    board.getByRowCol(1, 1).terrain = Terrain.FOREST;
    board.getByRowCol(1, 2).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 3).terrain = Terrain.FOREST;
    board.getByRowCol(1, 4).terrain = Terrain.FOREST;
    board.getByRowCol(1, 5).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 6).terrain = Terrain.FOREST;
    board.getByRowCol(1, 7).terrain = Terrain.GRASSLAND;

    board.getByRowCol(2, 0).terrain = Terrain.FOREST;
    board.getByRowCol(2, 1).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 2).terrain = Terrain.FOREST;
    board.getByRowCol(2, 3).terrain = Terrain.FOREST;
    board.getByRowCol(2, 4).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 5).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 6).terrain = Terrain.HILL;
    board.getByRowCol(2, 7).terrain = Terrain.GRASSLAND;

    board.getByRowCol(3, 0).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 1).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 2).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 3).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 4).terrain = Terrain.FOREST;
    board.getByRowCol(3, 5).terrain = Terrain.MOUNTAIN;
    board.getByRowCol(3, 6).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 7).terrain = Terrain.GRASSLAND;

    this.mirrorToOtherSide(board);

    return board;
  }

  createBoard7(): Board {
    const board = new Board();

    board.getByRowCol(0, 0).terrain = Terrain.FOREST;
    board.getByRowCol(0, 1).terrain = Terrain.FOREST;
    board.getByRowCol(0, 2).terrain = Terrain.FOREST;
    board.getByRowCol(0, 3).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 4).terrain = Terrain.FOREST;
    board.getByRowCol(0, 5).terrain = Terrain.HILL;
    board.getByRowCol(0, 6).terrain = Terrain.FOREST;
    board.getByRowCol(0, 7).terrain = Terrain.GRASSLAND;

    board.getByRowCol(1, 0).terrain = Terrain.MOUNTAIN;
    board.getByRowCol(1, 1).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 2).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 3).terrain = Terrain.FOREST;
    board.getByRowCol(1, 4).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 5).terrain = Terrain.FOREST;
    board.getByRowCol(1, 6).terrain = Terrain.HILL;
    board.getByRowCol(1, 7).terrain = Terrain.GRASSLAND;

    board.getByRowCol(2, 0).terrain = Terrain.HILL;
    board.getByRowCol(2, 1).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 2).terrain = Terrain.FOREST;
    board.getByRowCol(2, 3).terrain = Terrain.FOREST;
    board.getByRowCol(2, 4).terrain = Terrain.FOREST;
    board.getByRowCol(2, 5).terrain = Terrain.HILL;
    board.getByRowCol(2, 6).terrain = Terrain.FOREST;
    board.getByRowCol(2, 7).terrain = Terrain.GRASSLAND;

    board.getByRowCol(3, 0).terrain = Terrain.HILL;
    board.getByRowCol(3, 1).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 2).terrain = Terrain.FOREST;
    board.getByRowCol(3, 3).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 4).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 5).terrain = Terrain.FOREST;
    board.getByRowCol(3, 6).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 7).terrain = Terrain.GRASSLAND;

    this.mirrorToOtherSide(board);

    return board;
  }

  createBoard8(): Board {
    const board = new Board();

    board.getByRowCol(0, 0).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 1).terrain = Terrain.FOREST;
    board.getByRowCol(0, 2).terrain = Terrain.FOREST;
    board.getByRowCol(0, 3).terrain = Terrain.GRASSLAND;
    board.getByRowCol(0, 4).terrain = Terrain.FOREST;
    board.getByRowCol(0, 5).terrain = Terrain.MARSH;
    board.getByRowCol(0, 6).terrain = Terrain.FOREST;
    board.getByRowCol(0, 7).terrain = Terrain.FOREST;

    board.getByRowCol(1, 0).terrain = Terrain.MARSH;
    board.getByRowCol(1, 1).terrain = Terrain.MARSH;
    board.getByRowCol(1, 2).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 3).terrain = Terrain.MARSH;
    board.getByRowCol(1, 4).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 5).terrain = Terrain.MARSH;
    board.getByRowCol(1, 6).terrain = Terrain.MARSH;
    board.getByRowCol(1, 7).terrain = Terrain.GRASSLAND;

    board.getByRowCol(2, 0).terrain = Terrain.MOUNTAIN;
    board.getByRowCol(2, 1).terrain = Terrain.MARSH;
    board.getByRowCol(2, 2).terrain = Terrain.MARSH;
    board.getByRowCol(2, 3).terrain = Terrain.MARSH;
    board.getByRowCol(2, 4).terrain = Terrain.MARSH;
    board.getByRowCol(2, 5).terrain = Terrain.MARSH;
    board.getByRowCol(2, 6).terrain = Terrain.MARSH;
    board.getByRowCol(2, 7).terrain = Terrain.GRASSLAND;

    board.getByRowCol(3, 0).terrain = Terrain.HILL;
    board.getByRowCol(3, 1).terrain = Terrain.GRASSLAND;
    board.getByRowCol(3, 2).terrain = Terrain.MARSH;
    board.getByRowCol(3, 3).terrain = Terrain.HILL;
    board.getByRowCol(3, 4).terrain = Terrain.HILL;
    board.getByRowCol(3, 5).terrain = Terrain.MARSH;
    board.getByRowCol(3, 6).terrain = Terrain.FOREST;
    board.getByRowCol(3, 7).terrain = Terrain.GRASSLAND;

    this.mirrorToOtherSide(board);

    return board;
  }

  private mirrorToOtherSide(board: Board): void {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 8; col++) {
        const position = new Position(row, col);
        const terrain = board.getCell(position).terrain;
        board.getCell(position.mirror()).terrain = terrain;
      }
    }
  }
}