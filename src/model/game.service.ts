import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Cell } from "./cell";
import { Bristleback } from "./piece/bristleback";
import { Burrower } from "./piece/burrower";
import { Scrapper } from "./piece/scrapper";
import { Player } from "./player";
import { TurnService } from "./turn.service";
import { Position } from "./position";
import { Lancehorn } from "./piece/lancehorn";
import { Charger } from "./piece/charger";

/**
 * Provides the main game engine logic.
 */
@Injectable()
export class GameService {

  private winningPlayer: Player | null = null;

  constructor(
    private board: Board,
    private turnService: TurnService,
    @Optional() @SkipSelf() service?: GameService) {
    if (service) {
      throw new Error('Singleton violation: GameService');
    }

    this.reset();
  }

  reset(): void {
    this.winningPlayer = null;
    // Player 1 pieces
    let player1 = this.turnService.player1;
    this.board.getByRowCol(0, 2).setPiece(new Scrapper(player1));
    this.board.getByRowCol(0, 3).setPiece(new Burrower(player1));
    this.board.getByRowCol(0, 4).setPiece(new Lancehorn(player1));
    this.board.getByRowCol(0, 5).setPiece(new Charger(player1));

    // Player 2 pieces
    let player2 = this.turnService.player2;
    this.board.getByRowCol(7, 2).setPiece(new Lancehorn(player2));
    this.board.getByRowCol(7, 3).setPiece(new Charger(player2));
    this.board.getByRowCol(7, 4).setPiece(new Bristleback(player2));
    this.board.getByRowCol(7, 5).setPiece(new Scrapper(player2));
  }

  /**
   * Tries to take an action by interpreting intent.
   * @param srcPos The position of the source piece.
   * @param destPos The target of the action.
   */
  public takeAction(srcPos: Position, destPos: Position): void {
    let srcCell = this.board.getCell(srcPos);
    let destCell = this.board.getCell(destPos);

    if (!srcCell.hasPiece()) {
      // No piece to move.
      return;
    }

    let srcPiece = srcCell.getPiece()!;
    if (!srcPiece.player.isActive()) {
      // Player can only take action on own pieces.
      return;
    }

    if (this.canMove(srcCell, destCell)) {
      this.move(srcCell, destCell);
    } else if (this.canAttack(srcCell, destCell)) {
      this.attack(srcCell, destCell);
    }
  }

  canAttack(srcCell: Cell, destCell: Cell): boolean {
    if (!srcCell.hasPiece() || !destCell.hasPiece()) {
      return false;
    }
    let srcPiece = srcCell.getPiece()!;
    let destPiece = destCell.getPiece()!;
    if (!srcPiece.player.isActive() || srcPiece.player == destPiece.player || srcPiece.hasAttacked()) {
      return false;
    }
    if (!srcPiece.hasBeenActivated() && !this.turnService.getActivePlayer().canActivatePiece()) {
      return false;
    }
    // The target piece must be in range.
    let delta = this.delta(srcCell.position, destCell.position);
    return delta <= srcPiece.attackRange;
  }

  private attack(srcCell: Cell, destCell: Cell): void {
    if (!srcCell.hasPiece() || !destCell.hasPiece()) {
      throw new Error('Cannot attack without two pieces');
    }
    let activePlayer = this.turnService.getActivePlayer();
    let srcPiece = srcCell.getPiece()!;
    if (!srcPiece.hasBeenActivated()) {
      activePlayer.addActivatedPiece(srcPiece);
    }
    let destPiece = destCell.getPiece()!;
    // This is an attack.
    let died = destPiece.takeDamage(srcPiece.attack);
    if (died) {
      activePlayer.addPoints(destPiece.points);
      destCell.clearPiece();
      this.checkWinCondition();
    }
    // Turn book-keeping
    srcPiece.attacked = true;
  }

  canMove(srcCell: Cell, destCell: Cell): boolean {
    if (!this.turnService.getActivePlayer().canMove()) {
      return false;
    }
    if (!srcCell.hasPiece() || destCell.hasPiece()) {
      return false;
    }
    let srcPiece = srcCell.getPiece()!;
    if (srcPiece.hasMoved() || !srcPiece.player.isActive()) {
      return false;
    }
    if (!srcPiece.hasBeenActivated() && !this.turnService.getActivePlayer().canActivatePiece()) {
      return false;
    }
    // total row and col delta cannot exceed movement value
    let delta = this.delta(srcPiece.getPosition(), destCell.position);
    return delta <= srcPiece.movement;
  }

  private delta(srcPos: Position, destPos: Position) {
    return Math.abs(srcPos.row - destPos.row)
      + Math.abs(srcPos.col - destPos.col);
  }

  private move(srcCell: Cell, destCell: Cell): void {
    let srcPiece = srcCell.getPiece()!;
    if (!srcPiece.hasBeenActivated()) {
      this.turnService.getActivePlayer().addActivatedPiece(srcPiece);
    }
    destCell.setPiece(srcPiece);
    srcCell.clearPiece();
    srcPiece.moved = true;
  }

  private checkWinCondition(): void {
    if (this.hasWon(this.turnService.player1)) {
      this.winningPlayer = this.turnService.player1;
    }
    if (this.hasWon(this.turnService.player2)) {
      this.winningPlayer = this.turnService.player2;
    }
  }

  private hasWon(player: Player): boolean {
    return player.getPoints() >= 2;
  }

  public isGameOver(): boolean {
    return this.winningPlayer != null;
  }

  public getWinningPlayer(): Player | null {
    return this.winningPlayer;
  }
}
