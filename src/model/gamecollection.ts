import { Injectable, Optional, SkipSelf } from "@angular/core";
import { BoardCollection } from "./boardcollection";
import { Game } from "./game";
import { PieceCollection } from "./piececollection";

/**
 * This is the collection of pre-made games to choose from.
 */
@Injectable()
export class GameCollection {

  private games = new Array<Game>();

  constructor(
    private boardCollection: BoardCollection,
    @Optional() @SkipSelf() service: GameCollection) {
    if (service) {
      throw new Error('Singleton violation: GameCollection');
    }

    this.games.push(this.createGame1());
    this.games.push(this.createGame2());
    this.games.push(this.createGame3());
  }

  getGames(): Array<Game> {
    return this.games;
  }

  findById(id: string): Game | null {
    for (let game of this.games) {
      if (game.getId() == id) {
        return game;
      }
    }
    return null;
  }

  private createGame1(): Game {
    const board = this.boardCollection.getBoard1();
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
    const board = this.boardCollection.getBoard2();
    const pieceCollection = new PieceCollection();
    
    return new Game(board, pieceCollection);
  }

  private createGame3(): Game {
    const board = this.boardCollection.getBoard3();
    const pieceCollection = new PieceCollection();
    
    return new Game(board, pieceCollection);
  }
}