import { Board } from "../model/board";
import { Direction } from "../model/direction";
import { Player } from "../model/player";
import { Position } from "../model/position";
import { Terrain } from "../model/terrain";
import { Piece } from "../model/piece/piece";

export class BaseTest {

  public board: Board;
  public player1: Player;
  public player2: Player;

  constructor() {
    this.board = new Board();
    this.board.setAllTerrain(Terrain.GRASSLAND);

    this.player1 = new Player(true, 'Player 1', Direction.DOWN);
    this.player2 = new Player(false, 'Player 2', Direction.UP);
  }

  initializePiece(piece: Piece, row: number, col: number): void {
    this.board.getByRowCol(row, col).setPiece(piece);
    piece.position = new Position(row, col);
    piece.clearTurnData();
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
    piece.setHealth(health);
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