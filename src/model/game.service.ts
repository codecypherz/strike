import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Bristleback } from "./machine/bristleback";
import { Burrower } from "./machine/burrower";
import { Charger } from "./machine/charger";
import { Glinthawk } from "./machine/glinthawk";
import { Lancehorn } from "./machine/lancehorn";
import { Piece } from "./piece/piece";
import { Scrapper } from "./machine/scrapper";
import { Player } from "./player";
import { TurnService } from "./turn.service";
import { Widemaw } from "./machine/widemaw";

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
    this.addPiece(0, 1, new Scrapper(board, player1));
    this.addPiece(0, 2, new Glinthawk(board, player1));
    this.addPiece(0, 3, new Burrower(board, player1));
    this.addPiece(0, 4, new Widemaw(board, player1));
    this.addPiece(0, 5, new Bristleback(board, player1));
    this.addPiece(0, 6, new Charger(board, player1));
    this.addPiece(0, 7, new Lancehorn(board, player1));

    // Player 2 pieces
    let player2 = this.turnService.player2;
    this.addPiece(7, 0, new Lancehorn(board, player2));
    this.addPiece(7, 1, new Charger(board, player2));
    this.addPiece(7, 2, new Bristleback(board, player2));
    this.addPiece(7, 3, new Widemaw(board, player2));
    this.addPiece(7, 4, new Burrower(board, player2));
    this.addPiece(7, 5, new Glinthawk(board, player2));
    this.addPiece(7, 6, new Scrapper(board, player2));
  }

  private addPiece(row: number, col: number, piece: Piece): void {
    // Add the piece to the board.
    const cell = this.board.getByRowCol(row, col);
    cell.setPiece(piece);
    piece.position = cell.position;

    // Listen for when it dies.
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
