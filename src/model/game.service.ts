import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Cell } from "./cell";
import { Bristleback } from "./piece/bristleback";
import { Burrower } from "./piece/burrower";
import { Scrapper } from "./piece/scrapper";
import { Player } from "./player";
import { PlayerService } from "./player.service";
import { Position } from "./position";

/**
 * Provides the main game engine logic.
 */
@Injectable()
export class GameService {

  private winningPlayer: Player | null = null;

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
    this.winningPlayer = null;
    // Player 1 pieces
    let player1 = this.playerService.player1;
    this.board.getByRowCol(0, 2).setPiece(new Scrapper(player1));
    this.board.getByRowCol(0, 3).setPiece(new Burrower(player1));

    // Player 2 pieces
    let player2 = this.playerService.player2;
    this.board.getByRowCol(7, 4).setPiece(new Bristleback(player2));
    this.board.getByRowCol(7, 5).setPiece(new Scrapper(player2));
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

    if (this.canAttack(srcCell, destCell)) {
      return this.attack(srcCell, destCell);
    }

    // Invalid move.
    return false;
  }

  canAttack(srcCell: Cell, destCell: Cell): boolean {
    if (!srcCell.hasPiece() || !destCell.hasPiece()) {
      return false;
    }
    let srcPiece = srcCell.getPiece()!;
    let destPiece = destCell.getPiece()!;
    if (srcPiece.player == destPiece.player) {
      return false;
    }
    // The target piece must be in range.
    let delta = this.delta(srcCell.position, destCell.position);
    return delta <= srcPiece.attackRange;
  }

  private attack(srcCell: Cell, destCell: Cell): boolean {
    if (!srcCell.hasPiece() || !destCell.hasPiece()) {
      throw new Error('Cannot attack without two pieces');
    }
    let srcPiece = srcCell.getPiece()!;
    let destPiece = destCell.getPiece()!;
    // This is an attack.
    let died = destPiece.takeDamage(srcPiece.attack);
    if (died) {
      this.playerService.getActivePlayer().addPoints(destPiece.points);
      destCell.clearPiece();
      this.checkWinCondition();
    }
    if (!this.isGameOver()) {
      this.playerService.endTurn();
    }
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
    let delta = this.delta(piece.getPosition(), destCell.position);
    return delta <= piece.movement;
  }

  private delta(srcPos: Position, destPos: Position) {
    return Math.abs(srcPos.row - destPos.row)
        + Math.abs(srcPos.col - destPos.col);
  }

  private move(srcCell: Cell, destCell: Cell): boolean {
    let srcPiece = srcCell.getPiece();
    destCell.setPiece(srcPiece);
    srcCell.clearPiece();
    this.playerService.endTurn();
    return true;
  }

  private checkWinCondition(): void {
    if (this.hasWon(this.playerService.player1)) {
      this.winningPlayer = this.playerService.player1;
    }
    if (this.hasWon(this.playerService.player2)) {
      this.winningPlayer = this.playerService.player2;
    }
  }

  private hasWon(player: Player): boolean {
    return player.getPoints() >= 2;
  }

  public isGameOver(): boolean {
    return this.winningPlayer != null;
  }

  public getWinningPlayer(): Player|null {
    return this.winningPlayer;
  }
}
