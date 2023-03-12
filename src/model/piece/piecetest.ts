import { Board } from "../board";
import { Direction } from "../direction";
import { Player } from "../player";
import { Position } from "../position";
import { Terrain } from "../terrain";
import { Piece } from "./piece";

export class PieceTest {

  public board: Board;
  public player1: Player;
  public player2: Player;

  constructor() {
    this.board = new Board();
    this.board.setAllTerrain(Terrain.GRASSLAND);

    this.player1 = new Player('player-1', 'Player 1', Direction.DOWN);
    this.player2 = new Player('player-2', 'Player 2', Direction.UP);
  }

  initializePiece(piece: Piece, row: number, col: number): void {
    this.board.getByRowCol(row, col).setPiece(piece);
    piece.position = new Position(row, col);
    piece.stageAction();
  }

  setTerrain(row: number, col: number, terrain: Terrain): void {
    this.board.getByRowCol(row, col).terrain = terrain;
  }

  performMove(piece: Piece, row: number, col: number): void {
    this.performMove_(piece, row, col, false);
  }
  
  performMoveWithOvercharge(piece: Piece, row: number, col: number): void {
    this.performMove_(piece, row, col, true);
  }

  private performMove_(piece: Piece, row: number, col: number, overcharge: boolean): void {
    piece.select();
    if (overcharge) {
      expect(piece.canOvercharge()).toBe(true);
      piece.overcharge();
    }
    piece.moveOrSprintTo(this.board.getByRowCol(row, col));
    expect(piece.hasConfirmableMove()).toBe(true);
    piece.confirmMove();
    piece.deselect();
  }

  performAttack(piece: Piece): void {
    piece.select();
    expect(piece.canAttack()).toBe(true);
    expect(piece.hasConfirmableAttack()).toBe(true);
    this.board.clearStagedAttackData();
    piece.attack();
    piece.deselect();
  }
  
  setHealth(piece: Piece, health: number): void {
    piece.clearStagedAttackData();
    piece.setHealth(1);
    expect(piece.getUnstagedHealth()).toBe(health);
  }

  setActivePlayer1(): void {
    this.player1.setActive(true);
    this.player2.setActive(false);
  }

  setActivePlayer2(): void {
    this.player1.setActive(false);
    this.player2.setActive(true);
  }
}