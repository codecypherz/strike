import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { PlayerService } from "./player.service";
import { Position } from "./position";

/**
 * Provides the main game engine logic.
 */
@Injectable()
export class GameService {

  constructor(
    private board: Board,
    private playerService: PlayerService,
    @Optional() @SkipSelf() service?: GameService) {
    if (service) {
      throw new Error('Singleton violation: GameService');
    }
  }

  movePiece(src: Position, dest: Position): boolean {
    let srcCell = this.board.getCell(src);
    if (!srcCell.hasPiece()) {
      // No piece to move.
      return false;
    }
    let destCell = this.board.getCell(dest);
    if (destCell.hasPiece()) {
      // Can't move to an occupied space.
      return false;
    }
    // Move is valid.
    destCell.setPiece(srcCell.getPiece());
    srcCell.setPiece(null);
    this.playerService.endTurn();
    return true;
  }
}
