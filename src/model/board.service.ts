import { Injectable } from "@angular/core";
import { Piece } from "./piece/piece";

/**
 * Provides the data for the board.
 */
@Injectable({ providedIn: 'root' })
export class BoardService {

  static readonly WIDTH: number = 8;
  static readonly HEIGHT: number = 8;

  private pieces: Piece[][];

  constructor() {
    this.pieces = new Array<Array<Piece>>();
    for (let row = 0; row < BoardService.HEIGHT; row++) {
      let rowArr: Piece[] = new Array<Piece>();
      for (let col = 0; col < BoardService.WIDTH; col++) {
        rowArr.push(null);
      }
      this.pieces.push(rowArr);
    }
  }

  getPieces(): Piece[][] {
    return this.pieces;
  }

  getPiece(row: number, col: number): Piece|null {
    return this.pieces[row][col];
  }

  getWidth() {
    return BoardService.WIDTH;
  }

  getHeight() {
    return BoardService.HEIGHT;
  }
}
