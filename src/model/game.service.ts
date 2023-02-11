import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Cell } from "./cell";
import { Burrower } from "./piece/burrower";
import { Scrounger } from "./piece/scrounger";
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

    this.reset();
  }

  reset(): void {
    this.gameOver = false;
    // Player 1 pieces
    let player1 = this.playerService.player1;
    this.board.getByRowCol(0, 2).setPiece(new Scrounger(player1));
    this.board.getByRowCol(0, 3).setPiece(new Burrower(player1));

    // Player 2 pieces
    let player2 = this.playerService.player2;
    this.board.getByRowCol(7, 4).setPiece(new Burrower(player2));
    this.board.getByRowCol(7, 5).setPiece(new Scrounger(player2));
  }

  /**
   * Tries to take an action by interpreting intent.
   * @param srcPos The position of the source piece.
   * @param destPos The target of the action.
   * @returns True if a move or attack took place.
   */
  public takeAction(srcPos: Position, destPos: Position): boolean {
    let srcCell = this.board.getCell(srcPos);
    let destCell = this.board.getCell(destPos);
    
    if (!srcCell.hasPiece()) {
      // No piece to move.
      return false;
    }

    let srcPiece = srcCell.getPiece()!;
    if (!srcPiece.player.isActive()) {
      // Player can only take action on own pieces.
      return false;
    }

    if (this.canMove(srcCell, destCell)) {
      return this.move(srcCell, destCell);
    }

    if (this.canAttack(destCell)) {
      return this.attack(srcCell, destCell);
    }

    // Invalid move.
    return false;
  }

  private canAttack(destCell: Cell): boolean {
    return destCell.hasPiece() && !destCell.getPiece()!.player.isActive();
  }

  private attack(srcCell: Cell, destCell: Cell): boolean {
    let srcPiece = srcCell.getPiece();
    let destPiece = destCell.getPiece()!;
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

  canMove(srcCell: Cell, destCell: Cell): boolean {
    if (!srcCell.hasPiece() || destCell.hasPiece()) {
      return false;
    }
    let piece = srcCell.getPiece()!;
    if (!piece.player.isActive()) {
      return false;
    }
    // total row and col delta cannot exceed movement value
    let delta = Math.abs(piece.getPosition().row - destCell.position.row);
    delta += Math.abs(piece.getPosition().col - destCell.position.col);
    return delta <= piece.movement;
  }

  private move(srcCell: Cell, destCell: Cell): boolean {
    let srcPiece = srcCell.getPiece();
    destCell.setPiece(srcPiece);
    srcCell.clearPiece();
    this.playerService.endTurn();
    return true;
  }

  private checkWinCondition(): void {
    if (this.playerService.getActivePlayer().getPoints() >= 1) {
      console.log('Game over!');
      this.gameOver = true;
    }
  }

  public isGameOver(): boolean {
    return this.gameOver;
  }
}
