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

  private gameOver: boolean = false;

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
      let destPiece = destCell.getPiece();
      // This is an attack.
      // For now, the piece just dies.
      this.playerService.getActivePlayer().addPoints(destPiece.points);
      this.checkWinCondition();
      destCell.clearPiece();
      // Move the piece into the dest cell.
      srcCell.clearPiece();
      destCell.setPiece(srcPiece);
      return true;
    }
    // Move is valid.
    destCell.setPiece(srcPiece);
    srcCell.clearPiece();
    this.playerService.endTurn();
    return true;
  }

  checkWinCondition(): void {
    if (this.playerService.getActivePlayer().getPoints() >= 1) {
      console.log('Game over!');
      this.gameOver = true;
    }
  }

  isGameOver(): boolean {
    return this.gameOver;
  }
}
