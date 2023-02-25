import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Bristleback } from "./piece/bristleback";
import { Burrower } from "./piece/burrower";
import { Charger } from "./piece/charger";
import { Lancehorn } from "./piece/lancehorn";
import { Piece } from "./piece/piece";
import { Scrapper } from "./piece/scrapper";
import { Player } from "./player";
import { TurnService } from "./turn.service";

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
    const board = this.board;
    // Player 1 pieces
    let player1 = this.turnService.player1;
    this.addPiece(2, 2, new Lancehorn(board, player1));
    this.addPiece(0, 4, new Charger(board, player1));
    this.addPiece(0, 3, new Bristleback(board, player1));
    this.addPiece(1, 2, new Scrapper(board, player1));
    this.addPiece(1, 4, new Burrower(board, player1));

    // Player 2 pieces
    let player2 = this.turnService.player2;
    this.addPiece(2, 4, new Lancehorn(board, player2));
    this.addPiece(7, 3, new Charger(board, player2));
    this.addPiece(7, 4, new Bristleback(board, player2));
    this.addPiece(6, 5, new Scrapper(board, player2));
    this.addPiece(1, 3, new Burrower(board, player2));
  }

  private addPiece(row: number, col: number, piece: Piece): void {
    const cell = this.board.getByRowCol(row, col);
    cell.setPiece(piece);
    piece.position = cell.position;

    piece.addEventListener(Piece.PIECE_DIED_EVENT, this.onPieceDied.bind(this, piece));
  }

  onPieceDied(piece: Piece): void {
    // Remove the listener to not consume memory.
    piece.removeEventListener(Piece.PIECE_DIED_EVENT, this.onPieceDied.bind(this, piece));
    // If a piece dies, then award the other player those points.
    this.turnService.getOtherPlayer(piece.player).addPoints(piece.points);
    // Now that points have been awarded, check the win condition.
    this.checkWinCondition();
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
    return player.getPoints() >= 7;
  }

  isGameOver(): boolean {
    return this.winningPlayer != null;
  }

  getWinningPlayer(): Player | null {
    return this.winningPlayer;
  }
}
