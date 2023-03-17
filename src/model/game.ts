import { Board } from "./board";
import { PieceCollection } from "./piececollection";
import { v4 as uuidv4 } from 'uuid';

export class Game {
  
  private id = uuidv4();

  constructor(public board: Board, public pieceCollection: PieceCollection) {
    this.board = board;
    this.pieceCollection = pieceCollection;
  }

  getId(): string {
    return this.id;
  }
}
