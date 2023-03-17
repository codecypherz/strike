import { Board } from "./board";
import { PieceCollection } from "./piececollection";

export class Game {
  
  constructor(public board: Board, public pieceCollection: PieceCollection) {
    this.board = board;
    this.pieceCollection = pieceCollection;
  }
}
