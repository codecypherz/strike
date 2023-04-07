import { Injectable, Optional, SkipSelf } from "@angular/core";
import { BoardCollection } from "./board-collection";
import { Game } from "./game";
import { Burrower } from "./machine/burrower";
import { Fireclaw } from "./machine/fireclaw";
import { Glinthawk } from "./machine/glinthawk";
import { Grazer } from "./machine/grazer";
import { Leaplasher } from "./machine/leaplasher";
import { Longleg } from "./machine/longleg";
import { Ravager } from "./machine/ravager";
import { RedeyeWatcher } from "./machine/redeye-watcher";
import { Rollerback } from "./machine/rollerback";
import { Skydrifter } from "./machine/skydrifter";
import { Slaughterspine } from "./machine/slaughterspine";
import { Slitherfang } from "./machine/slitherfang";
import { Snapmaw } from "./machine/snapmaw";
import { Stormbird } from "./machine/stormbird";
import { Thunderjaw } from "./machine/thunderjaw";
import { Tideripper } from "./machine/tideripper";
import { Widemaw } from "./machine/widemaw";
import { PieceCtor } from "./piece/piece";
import { Position } from "./position";

/**
 * This is the collection of pre-made games to choose from.
 */
@Injectable()
export class GameCollection {

  private createdGames = new Array<Game>();

  constructor(
    private boardCollection: BoardCollection,
    @Optional() @SkipSelf() service: GameCollection) {
    if (service) {
      throw new Error('Singleton violation: GameCollection');
    }
  }

  addCreatedGame(game: Game): void {
    this.createdGames.push(game);
  }

  findById(id: string): Game | null {
    for (let game of this.createdGames) {
      if (game.getId() == id) {
        return game;
      }
    }
    return null;
  }

  createGame1(): Game {
    const board = this.boardCollection.createBoard1();
    const game = new Game(board);

    this.addPiece(1, 2, game, Fireclaw);
    this.addPiece(0, 5, game, Burrower);
    this.addPiece(1, 6, game, Grazer);

    return game;
  }

  createGame2(): Game {
    const board = this.boardCollection.createBoard2();
    const game = new Game(board);

    this.addPiece(0, 4, game, Glinthawk);
    this.addPiece(1, 1, game, Ravager);
    this.addPiece(0, 6, game, Ravager);

    return game;
  }

  createGame3(): Game {
    const board = this.boardCollection.createBoard3();
    const game = new Game(board);

    this.addPiece(0, 4, game, Slitherfang);
    this.addPiece(1, 6, game, Leaplasher);

    return game;
  }

  createGame4(): Game {
    const board = this.boardCollection.createBoard4();
    const game = new Game(board);

    this.addPiece(1, 0, game, Longleg);
    this.addPiece(1, 3, game, RedeyeWatcher);
    this.addPiece(0, 6, game, Rollerback);

    return game;
  }

  createGame5(): Game {
    const board = this.boardCollection.createBoard5();
    const game = new Game(board);

    this.addPiece(0, 4, game, Slaughterspine);

    return game;
  }

  createGame6(): Game {
    const board = this.boardCollection.createBoard6();
    const game = new Game(board);

    this.addPiece(1, 3, game, Thunderjaw);
    this.addPiece(0, 4, game, Snapmaw);

    return game;
  }

  createGame7(): Game {
    const board = this.boardCollection.createBoard7();
    const game = new Game(board);

    this.addPiece(0, 1, game, Stormbird);
    this.addPiece(1, 5, game, Skydrifter);
    this.addPiece(0, 6, game, Skydrifter);

    return game;
  }

  createGame8(): Game {
    const board = this.boardCollection.createBoard8();
    const game = new Game(board);

    this.addPiece(1, 3, game, Widemaw);
    this.addPiece(0, 6, game, Tideripper);

    return game;
  }

  private addPiece(row: number, col: number, game: Game, Piece: PieceCtor): void {
    // Add the piece for player 1
    const piece1 = new Piece();
    piece1.position = new Position(row, col);
    game.initializePiece(piece1, game.getPlayer1());

    // Add the piece for player 2
    // The position is mirrored.
    const piece2 = new Piece();
    piece2.position = piece1.position.mirror();
    game.initializePiece(piece2, game.getPlayer2());
  }
}