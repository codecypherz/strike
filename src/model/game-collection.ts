import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { BoardCollection } from "./board-collection";
import { Game } from "./game";
import { ApexClawstrider } from "./machine/apex-clawstrider";
import { Behemoth } from "./machine/behemoth";
import { Bellowback } from "./machine/bellowback";
import { Bristleback } from "./machine/bristleback";
import { Burrower } from "./machine/burrower";
import { Charger } from "./machine/charger";
import { Clamberjaw } from "./machine/clamberjaw";
import { Dreadwing } from "./machine/dreadwing";
import { ElementalClawstrider } from "./machine/elemental-clawstrider";
import { Fanghorn } from "./machine/fanghorn";
import { Fireclaw } from "./machine/fireclaw";
import { Frostclaw } from "./machine/frostclaw";
import { Glinthawk } from "./machine/glinthawk";
import { Grazer } from "./machine/grazer";
import { Lancehorn } from "./machine/lancehorn";
import { Scrapper } from "./machine/scrapper";
import { Scrounger } from "./machine/scrounger";
import { Slitherfang } from "./machine/slitherfang";
import { TrackerBurrower } from "./machine/tracker-burrower";
import { Widemaw } from "./machine/widemaw";
import { Piece, PieceCtor } from "./piece/piece";
import { Player } from "./player";
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

    this.addPiece(1, 2, game, Scrapper);
    this.addPiece(1, 3, game, Burrower);
    this.addPiece(0, 4, game, Charger);
    this.addPiece(1, 6, game, Glinthawk);

    return game;
  }

  createGame2(): Game {
    const board = this.boardCollection.createBoard2();
    const game = new Game(board);

    this.addPiece(0, 4, game, Bristleback);
    this.addPiece(0, 1, game, Scrounger);
    this.addPiece(0, 6, game, Lancehorn);
    this.addPiece(1, 3, game, Glinthawk);

    return game;
  }

  createGame3(): Game {
    const board = this.boardCollection.createBoard3();
    const game = new Game(board);

    this.addPiece(0, 4, game, Slitherfang);
    this.addPiece(1, 6, game, Burrower);

    return game;
  }

  createGame4(): Game {
    const board = this.boardCollection.createBoard4();
    const game = new Game(board);

    this.addPiece(1, 0, game, Lancehorn);
    this.addPiece(1, 3, game, Clamberjaw);
    this.addPiece(1, 6, game, Widemaw);
    this.addPiece(0, 2, game, Bellowback);

    return game;
  }

  createGame5(): Game {
    const board = this.boardCollection.createBoard5();
    const game = new Game(board);

    this.addPiece(0, 4, game, Behemoth);
    this.addPiece(0, 6, game, Charger);
    this.addPiece(1, 3, game, TrackerBurrower);

    return game;
  }

  createGame6(): Game {
    const board = this.boardCollection.createBoard6();
    const game = new Game(board);

    this.addPiece(0, 2, game, Bristleback);
    this.addPiece(0, 4, game, Glinthawk);
    this.addPiece(0, 3, game, Scrapper);
    this.addPiece(1, 4, game, ApexClawstrider);
    this.addPiece(1, 6, game, Burrower);

    return game;
  }

  createGame7(): Game {
    const board = this.boardCollection.createBoard7();
    const game = new Game(board);

    this.addPiece(0, 1, game, Grazer);
    this.addPiece(0, 5, game, Charger);
    this.addPiece(0, 6, game, Fireclaw);
    this.addPiece(1, 2, game, Fanghorn);
    this.addPiece(1, 3, game, Burrower);

    return game;
  }

  createGame8(): Game {
    const board = this.boardCollection.createBoard8();
    const game = new Game(board);

    this.addPiece(1, 3, game, Widemaw);
    this.addPiece(0, 6, game, Dreadwing);
    this.addPiece(0, 5, game, Frostclaw);
    this.addPiece(1, 4, game, Lancehorn);

    return game;
  }

  private addPiece(row: number, col: number, game: Game, Piece: PieceCtor): void {
    const board = game.getBoard();

    // Add the piece for player 1
    const piece1 = new Piece();
    piece1.position = new Position(row, col);
    this.initializePiece(piece1, board, game.getPlayer1());

    // Add the piece for player 2
    // The position is mirrored.
    const piece2 = new Piece();
    piece2.position = new Position(7 - row, 7 - col);
    this.initializePiece(piece2, board, game.getPlayer2());
  }

  private initializePiece(piece: Piece, board: Board, player: Player) {
    piece.setDirection(player.defaultDirection);
    piece.setBoard(board);
    piece.setPlayer(player);

    board.getCell(piece.position).setPiece(piece);

    player.addPiece(piece);
  }
}