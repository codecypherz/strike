import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Terrain } from "./terrain";

/**
 * This is the collection of pre-made boards to choose from.
 */
@Injectable()
export class BoardCollection {

  private board1!: Board;
  private board2!: Board;
  private board3!: Board;

  constructor(@Optional() @SkipSelf() service: BoardCollection) {
    if (service) {
      throw new Error('Singleton violation: BoardCollection');
    }

    console.info('BoardCollection, creating boards');
    this.board1 = this.createBoard1();
    this.board2 = this.createBoard2();
    this.board3 = this.createBoard3();
  }

  getBoard1(): Board {
    return this.board1;
  }
  
  getBoard2(): Board {
    return this.board2;
  }
  
  getBoard3(): Board {
    return this.board3;
  }

  private createBoard1() {
    const board = new Board();
    board.getByRowCol(0, 3).terrain = Terrain.FOREST;
    board.getByRowCol(0, 5).terrain = Terrain.FOREST;

    board.getByRowCol(1, 0).terrain = Terrain.FOREST;
    board.getByRowCol(1, 1).terrain = Terrain.FOREST;
    board.getByRowCol(1, 2).terrain = Terrain.MOUNTAIN;
    board.getByRowCol(1, 4).terrain = Terrain.FOREST;
    board.getByRowCol(1, 6).terrain = Terrain.FOREST;

    board.getByRowCol(2, 2).terrain = Terrain.MOUNTAIN;
    board.getByRowCol(2, 3).terrain = Terrain.FOREST;
    board.getByRowCol(2, 4).terrain = Terrain.FOREST;
    board.getByRowCol(2, 6).terrain = Terrain.HILL;
    board.getByRowCol(2, 7).terrain = Terrain.FOREST;

    board.getByRowCol(3, 1).terrain = Terrain.HILL;
    board.getByRowCol(3, 2).terrain = Terrain.FOREST;
    board.getByRowCol(3, 4).terrain = Terrain.HILL;
    board.getByRowCol(3, 6).terrain = Terrain.MOUNTAIN;

    board.getByRowCol(4, 1).terrain = Terrain.MOUNTAIN;
    board.getByRowCol(4, 3).terrain = Terrain.HILL;
    board.getByRowCol(4, 5).terrain = Terrain.FOREST;
    board.getByRowCol(4, 6).terrain = Terrain.HILL;

    board.getByRowCol(5, 0).terrain = Terrain.FOREST;
    board.getByRowCol(5, 1).terrain = Terrain.HILL;
    board.getByRowCol(5, 3).terrain = Terrain.FOREST;
    board.getByRowCol(5, 4).terrain = Terrain.FOREST;
    board.getByRowCol(5, 5).terrain = Terrain.MOUNTAIN;

    board.getByRowCol(6, 1).terrain = Terrain.FOREST;
    board.getByRowCol(6, 3).terrain = Terrain.FOREST;
    board.getByRowCol(6, 5).terrain = Terrain.MOUNTAIN;
    board.getByRowCol(6, 6).terrain = Terrain.FOREST;
    board.getByRowCol(6, 7).terrain = Terrain.FOREST;

    board.getByRowCol(7, 2).terrain = Terrain.FOREST;
    board.getByRowCol(7, 4).terrain = Terrain.FOREST;
    return board;
  }

  private createBoard2(): Board {
    const board = new Board();
    board.getByRowCol(3, 0).terrain = Terrain.FOREST;
    board.getByRowCol(3, 1).terrain = Terrain.FOREST;
    board.getByRowCol(3, 2).terrain = Terrain.FOREST;
    board.getByRowCol(4, 7).terrain = Terrain.FOREST;
    board.getByRowCol(4, 6).terrain = Terrain.FOREST;
    board.getByRowCol(4, 5).terrain = Terrain.FOREST;

    board.getByRowCol(4, 0).terrain = Terrain.HILL;
    board.getByRowCol(4, 1).terrain = Terrain.HILL;
    board.getByRowCol(3, 7).terrain = Terrain.HILL;
    board.getByRowCol(3, 6).terrain = Terrain.HILL;

    board.getByRowCol(5, 0).terrain = Terrain.MOUNTAIN;
    board.getByRowCol(2, 7).terrain = Terrain.MOUNTAIN;

    board.getByRowCol(2, 3).terrain = Terrain.CHASM;
    board.getByRowCol(2, 4).terrain = Terrain.CHASM;
    board.getByRowCol(5, 3).terrain = Terrain.CHASM;
    board.getByRowCol(5, 4).terrain = Terrain.CHASM;

    board.getByRowCol(0, 7).terrain = Terrain.MARSH;
    board.getByRowCol(1, 6).terrain = Terrain.MARSH;
    board.getByRowCol(2, 5).terrain = Terrain.MARSH;
    board.getByRowCol(3, 4).terrain = Terrain.MARSH;
    board.getByRowCol(4, 3).terrain = Terrain.MARSH;
    board.getByRowCol(5, 2).terrain = Terrain.MARSH;
    board.getByRowCol(6, 1).terrain = Terrain.MARSH;
    board.getByRowCol(7, 0).terrain = Terrain.MARSH;
    return board;
  }

  private createBoard3(): Board {
    const board = new Board();
    board.getByRowCol(1, 0).terrain = Terrain.MOUNTAIN;
    board.getByRowCol(1, 1).terrain = Terrain.HILL;
    board.getByRowCol(1, 2).terrain = Terrain.FOREST;
    board.getByRowCol(1, 3).terrain = Terrain.GRASSLAND;
    board.getByRowCol(1, 4).terrain = Terrain.MARSH;
    board.getByRowCol(1, 5).terrain = Terrain.CHASM;

    board.getByRowCol(2, 2).terrain = Terrain.CHASM;
    board.getByRowCol(2, 3).terrain = Terrain.MARSH;
    board.getByRowCol(2, 4).terrain = Terrain.GRASSLAND;
    board.getByRowCol(2, 5).terrain = Terrain.FOREST;
    board.getByRowCol(2, 6).terrain = Terrain.HILL;
    board.getByRowCol(2, 7).terrain = Terrain.MOUNTAIN;

    board.getByRowCol(5, 0).terrain = Terrain.MOUNTAIN;

    board.getByRowCol(5, 3).terrain = Terrain.MARSH;
    board.getByRowCol(4, 2).terrain = Terrain.FOREST;
    return board;
  }
}