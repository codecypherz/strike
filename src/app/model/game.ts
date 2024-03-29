import { Board } from "./board";
import { PieceSet } from "./piece-set";
import { v4 as uuidv4 } from 'uuid';
import { Player } from "./player";
import { Direction } from "./direction";
import { Piece } from "./piece/piece";

export class Game extends EventTarget {

  static START_TURN_EVENT = 'start_turn';

  private id = uuidv4();

  private player1 = new Player(true, 'Player 1', Direction.DOWN);
  private player2 = new Player(false, 'Player 2', Direction.UP);
  private winningPlayer: Player | null = null;

  constructor(private board: Board) {
    super();
    this.board = board;
  }

  getId(): string {
    return this.id;
  }

  getPlayer1(): Player {
    return this.player1;
  }

  getPlayer2(): Player {
    return this.player2;
  }

  getBoard(): Board {
    return this.board;
  }

  setBoard(board: Board): void {
    this.board = board;
  }

  initializePiece(piece: Piece, player: Player): void {
    piece.setDirection(player.defaultDirection);
    piece.setBoard(this.board);
    piece.setPlayer(player);

    this.board.getCell(piece.position).setPiece(piece);

    player.addPiece(piece);
  }

  removePiece(pieceId: string): void {
    const piece = this.findPiece(pieceId);
    piece.getCell().clearPiece();
    piece.getPlayer().removePiece(piece);
  }

  findPiece(pieceId: string): Piece {
    let piece = this.player1.getPieces().find(pieceId);
    if (piece != null) {
      return piece;
    }
    piece = this.player2.getPieces().find(pieceId);
    if (piece != null) {
      return piece;
    }
    throw new Error(`Failed to find this piece: ${pieceId}`);
  }

  start(): void {
    this.dispatchEvent(new Event(Game.START_TURN_EVENT));
  }

  endTurn(): void {
    this.player1.toggleActive();
    this.player2.toggleActive();
    this.dispatchEvent(new Event(Game.START_TURN_EVENT));
  }

  getActivePlayer(): Player {
    if (this.player1.isActive()) {
      return this.player1;
    }
    return this.player2;
  }

  getOtherPlayer(player: Player): Player {
    if (this.player1.equals(player)) {
      return this.player2;
    }
    return this.player1;
  }

  checkWinCondition(): void {
    const p1 = this.hasWinningPoints(this.player1);
    const p2 = this.hasWinningPoints(this.player2);
    if (p1 && p2) {
      // Tie break goes to active player.
      this.winningPlayer = this.getActivePlayer();
    } else if (p1) {
      this.winningPlayer = this.player1;
    } else if (p2) {
      this.winningPlayer = this.player2;
    }
  }

  private hasWinningPoints(player: Player): boolean {
    return player.getPoints() >= 7;
  }

  isGameOver(): boolean {
    return this.winningPlayer != null;
  }

  getWinningPlayer(): Player | null {
    return this.winningPlayer;
  }
}
