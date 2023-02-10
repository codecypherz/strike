import { Injectable } from "@angular/core";
import { Board } from "./board";
import { BoardService } from "./board.service";
import { Piece } from "./piece/piece";
import { PlayerService } from "./player.service";
import { Position } from "./position";

/**
 * Provides the main game engine logic.
 */
@Injectable({ providedIn: 'root' })
export class GameService {

  constructor(private board: Board) { }

  movePiece(src: Position, dest: Position): boolean {
    console.info(this.board);
    let srcCell = this.board.getCell(src);
    if (!srcCell.hasPiece()) {
      // No piece to move.
      console.info('no piece to move', srcCell);
      return false;
    }
    let destCell = this.board.getCell(dest);
    if (destCell.hasPiece()) {
      // Can't move to an occupied space.
      console.info('cannot move to occupied');
      return false;
    }
    // Move is valid.
    console.info('moving piece');
    destCell.setPiece(srcCell.getPiece());
    srcCell.setPiece(null);
    return true;
  }
}
