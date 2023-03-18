import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { BoardCollection } from "./boardcollection";
import { Game } from "./game";
import { Bristleback } from "./machine/bristleback";
import { Burrower } from "./machine/burrower";
import { Charger } from "./machine/charger";
import { Glinthawk } from "./machine/glinthawk";
import { Lancehorn } from "./machine/lancehorn";
import { Scrapper } from "./machine/scrapper";
import { Scrounger } from "./machine/scrounger";
import { Slitherfang } from "./machine/slitherfang";
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

    this.addPiece(0, 1, game, Scrapper);
    this.addPiece(0, 2, game, Burrower);
    this.addPiece(0, 3, game, Charger);
    this.addPiece(0, 4, game, Glinthawk);
    this.addPiece(0, 5, game, Widemaw);

    return game;
  }

  createGame2(): Game {
    const board = this.boardCollection.createBoard2();
    const game = new Game(board);
    
    this.addPiece(0, 3, game, Bristleback);
    this.addPiece(0, 4, game, Scrounger);
    this.addPiece(0, 5, game, Lancehorn);

    return game;
  }

  createGame3(): Game {
    const board = this.boardCollection.createBoard3();
    const game = new Game(board);
    
    this.addPiece(0, 4, game, Slitherfang);
    this.addPiece(1, 6, game, Burrower);

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