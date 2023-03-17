import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Game } from "./game";
import { Scrapper } from "./machine/scrapper";
import { PieceCollection } from "./piececollection";

/**
 * This is the collection of pre-made games to choose from.
 */
@Injectable()
export class GameCollection {

  private games = new Array<Game>();

  constructor(@Optional() @SkipSelf() service: GameCollection) {
    this.games.push(this.createGame1());
    this.games.push(this.createGame2());
    this.games.push(this.createGame3());
  }

  getGames(): Array<Game> {
    return this.games;
  }
  
  private createGame1(): Game {
    const board = new Board();
    const pieceCollection = new PieceCollection();

    // pieceCollection.addPiece(0, 1, new Scrapper(board));
    // this.addPiece(0, 2, new Glinthawk(board, player1));
    // this.addPiece(0, 3, new Burrower(board, player1));
    // this.addPiece(0, 4, new Widemaw(board, player1));
    // this.addPiece(0, 5, new Charger(board, player1));
    // this.addPiece(0, 6, new Lancehorn(board, player1));

    return new Game(board, pieceCollection);
  }

  private createGame2(): Game {
    const board = new Board();
    const pieceCollection = new PieceCollection();
    
    return new Game(board, pieceCollection);
  }

  private createGame3(): Game {
    const board = new Board();
    const pieceCollection = new PieceCollection();
    
    return new Game(board, pieceCollection);
  }
}