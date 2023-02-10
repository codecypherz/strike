import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Burrower } from "./piece/burrower";
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

    this.setUp();
  }

  setUp(): void {
    // Player 1 pieces
    let player1 = this.playerService.player1;
    this.board.getByRowCol(0, 3).setPiece(new Burrower(player1));

    // Player 2 pieces
    let player2 = this.playerService.player2;
    this.board.getByRowCol(7, 4).setPiece(new Burrower(player2));
  }

  movePiece(src: Position, dest: Position): boolean {
    let srcCell = this.board.getCell(src);
    if (!srcCell.hasPiece()) {
      // No piece to move.
      return false;
    }
    let srcPiece = srcCell.getPiece();
    if (!srcPiece.player.isActive()) {
      // Can't move someone else's piece!
      return false;
    }
    let destCell = this.board.getCell(dest);
    if (destCell.hasPiece()) {
      // Can't move to an occupied space.
      return false;
    }
    // Move is valid.
    destCell.setPiece(srcPiece);
    srcCell.setPiece(null);
    this.playerService.endTurn();
    return true;
  }
}
