import { Board } from "./board";
import { PieceCollection } from "./piececollection";
import { v4 as uuidv4 } from 'uuid';
import { Player } from "./player";
import { Direction } from "./direction";

export class Game {
  
  private id = uuidv4();

  private player1 = new Player(true, 'Player 1', Direction.DOWN);
  private player2 = new Player(false, 'Player 2', Direction.UP);

  constructor(private board: Board, private pieceCollection: PieceCollection) {
    this.board = board;
    this.pieceCollection = pieceCollection;
  }

  getId(): string {
    return this.id;
  }

  getPlayer1(): Player {
    return this.player1;
  }

  getPlayer2(): Player {
    return this.player2;
  }

  getBoard(): Board {
    return this.board;
  }

  start(): void {
    // TODO: Move all turn service logic here.
  }
}
