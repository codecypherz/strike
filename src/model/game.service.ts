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
import { Terrain } from "./terrain";
import { Piece } from "./piece/piece";

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
    (window as any).gameService = this;

    this.reset();
  }

  reset(): void {
    this.winningPlayer = null;
    // Player 1 pieces
    let player1 = this.turnService.player1;
    this.addPiece(0, 2, new Scrapper(player1));
    this.addPiece(0, 3, new Burrower(player1));
    this.addPiece(6, 4, new Lancehorn(player1));
    this.addPiece(0, 5, new Charger(player1));

    // Player 2 pieces
    let player2 = this.turnService.player2;
    this.addPiece(7, 2, new Lancehorn(player2));
    this.addPiece(7, 3, new Charger(player2));
    this.addPiece(7, 4, new Bristleback(player2));
    this.addPiece(7, 5, new Scrapper(player2));
  }

  private addPiece(row: number, col: number, piece: Piece): void {
    const cell = this.board.getByRowCol(row, col);
    cell.setPiece(piece);
    piece.position = cell.position;
  }
  
  canAttack(srcCell: Cell, destCell: Cell): boolean {
    if (!srcCell.hasPiece() || !destCell.hasPiece()) {
      return false;
    }
    let srcPiece = srcCell.getPiece()!;
    let destPiece = destCell.getPiece()!;
    if (!srcPiece.player.isActive() || srcPiece.player.equals(destPiece.player) || srcPiece.attacked) {
      return false;
    }
    if (!srcPiece.hasBeenActivated() && !this.turnService.getActivePlayer().canActivatePiece()) {
      return false;
    }
    // The target piece must be in range.
    let delta = this.delta(srcCell.position, destCell.position);
    return delta <= srcPiece.attackRange;
  }

  canMove(srcCell: Cell, destCell: Cell): boolean {
    if (!this.turnService.getActivePlayer().canMove()) {
      return false;
    }
    if (!srcCell.hasPiece() || destCell.hasPiece()) {
      return false;
    }
    let srcPiece = srcCell.getPiece()!;
    if (srcPiece.moved || !srcPiece.player.isActive()) {
      return false;
    }
    if (!srcPiece.hasBeenActivated() && !this.turnService.getActivePlayer().canActivatePiece()) {
      return false;
    }
    // total row and col delta cannot exceed movement value
    let delta = this.delta(srcPiece.position, destCell.position);
    return delta <= srcPiece.movement;
  }

  canActivatePiece(piece: Piece): boolean {
    // Can't activate unless it's active player's piece.
    if (!piece.player.isActive()) {
      return false;
    }
    // True if this piece has already been activated.
    // TODO: Return false if both a move and attack have been made?
    if (piece.hasBeenActivated()) {
      return true;
    }
    // Piece hasn't been activated, so check if the player can still do that.
    return this.turnService.getActivePlayer().canActivatePiece();
  }

  activatePiece(piece: Piece): void {
    this.turnService.getActivePlayer().addActivatedPiece(piece);
  }

  private delta(srcPos: Position, destPos: Position) {
    return Math.abs(srcPos.row - destPos.row)
      + Math.abs(srcPos.col - destPos.col);
  }

  checkWinCondition(): void {
    if (this.hasWon(this.turnService.player1)) {
      this.winningPlayer = this.turnService.player1;
    }
    if (this.hasWon(this.turnService.player2)) {
      this.winningPlayer = this.turnService.player2;
    }
  }

  private hasWon(player: Player): boolean {
    return player.getPoints() >= 4;
  }

  isGameOver(): boolean {
    return this.winningPlayer != null;
  }

  getWinningPlayer(): Player | null {
    return this.winningPlayer;
  }
}
