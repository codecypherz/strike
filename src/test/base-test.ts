import { Game } from "src/model/game";
import { Board } from "../model/board";
import { Piece } from "../model/piece/piece";
import { Player } from "../model/player";
import { Position } from "../model/position";
import { Terrain } from "../model/terrain";

export class BaseTest {

  public game: Game;
  public board: Board;
  public player1: Player;
  public player2: Player;

  constructor() {
    this.board = new Board();
    this.board.setAllTerrain(Terrain.GRASSLAND);
    this.game = new Game(this.board);

    this.player1 = this.game.getPlayer1();
    this.player2 = this.game.getPlayer2();
  }

  initializePiece(piece: Piece, player: Player, row: number, col: number): void {
    piece.setDirection(player.defaultDirection);
    piece.setBoard(this.board);
    piece.setPlayer(player);

    piece.position = new Position(row, col);
    this.board.getCell(piece.position).setPiece(piece);

    player.addPiece(piece);

    piece.clearTurnData();
    piece.stageAction();
  }

  setTerrain(row: number, col: number, terrain: Terrain): void {
    this.board.getByRowCol(row, col).terrain = terrain;
  }

  performMove(piece: Piece, row: number, col: number): boolean {
    return this.performMove_(piece, row, col, false);
  }

  performMoveWithOvercharge(piece: Piece, row: number, col: number): void {
    this.performMove_(piece, row, col, true);
  }

  private performMove_(piece: Piece, row: number, col: number, overcharge: boolean): boolean {
    piece.select();
    if (overcharge) {
      expect(piece.canOvercharge()).toBe(true);
      piece.overcharge();
    }
    const sprinted = piece.moveOrSprintTo(this.board.getByRowCol(row, col));
    expect(piece.hasConfirmableMove()).toBe(true);
    piece.confirmMove();
    piece.deselect();
    return sprinted;
  }

  performAttack(piece: Piece) {
    this.performAttack_(piece, false);
  }

  performAttackWithOvercharge(piece: Piece) {
    this.performAttack_(piece, true);
  }

  private performAttack_(piece: Piece, overcharge: boolean): void {
    piece.select();
    if (overcharge) {
      expect(piece.canOvercharge()).toBeTrue();
      piece.overcharge();
    }
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