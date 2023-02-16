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
    this.addPiece(0, 4, new Lancehorn(player1));
    this.addPiece(0, 5, new Charger(player1));

    // Player 2 pieces
    let player2 = this.turnService.player2;
    this.addPiece(7, 2, new Lancehorn(player2));
    this.addPiece(7, 3, new Charger(player2));
    this.addPiece(7, 4, new Bristleback(player2));
    this.addPiece(7, 5, new Scrapper(player2));

    // Set some terrain
    this.board.getByRowCol(3, 0).setTerrain(Terrain.FOREST);
    this.board.getByRowCol(3, 1).setTerrain(Terrain.FOREST);
    this.board.getByRowCol(3, 2).setTerrain(Terrain.FOREST);
    this.board.getByRowCol(4, 7).setTerrain(Terrain.FOREST);
    this.board.getByRowCol(4, 6).setTerrain(Terrain.FOREST);
    this.board.getByRowCol(4, 5).setTerrain(Terrain.FOREST);

    this.board.getByRowCol(4, 0).setTerrain(Terrain.HILL);
    this.board.getByRowCol(4, 1).setTerrain(Terrain.HILL);
    this.board.getByRowCol(3, 7).setTerrain(Terrain.HILL);
    this.board.getByRowCol(3, 6).setTerrain(Terrain.HILL);

    this.board.getByRowCol(5, 0).setTerrain(Terrain.MOUNTAIN);
    this.board.getByRowCol(2, 7).setTerrain(Terrain.MOUNTAIN);

    this.board.getByRowCol(2, 3).setTerrain(Terrain.CHASM);
    this.board.getByRowCol(2, 4).setTerrain(Terrain.CHASM);
    this.board.getByRowCol(5, 3).setTerrain(Terrain.CHASM);
    this.board.getByRowCol(5, 4).setTerrain(Terrain.CHASM);

    this.board.getByRowCol(0, 7).setTerrain(Terrain.MARSH);
    this.board.getByRowCol(1, 6).setTerrain(Terrain.MARSH);
    this.board.getByRowCol(2, 5).setTerrain(Terrain.MARSH);
    this.board.getByRowCol(3, 4).setTerrain(Terrain.MARSH);
    this.board.getByRowCol(4, 3).setTerrain(Terrain.MARSH);
    this.board.getByRowCol(5, 2).setTerrain(Terrain.MARSH);
    this.board.getByRowCol(6, 1).setTerrain(Terrain.MARSH);
    this.board.getByRowCol(7, 0).setTerrain(Terrain.MARSH);
  }

  private addPiece(row: number, col: number, piece: Piece): void {
    const cell = this.board.getByRowCol(row, col);
    cell.setPiece(piece);
    piece.setPosition(cell.position);
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
    let attackPower = srcPiece.attack + srcCell.getTerrain().elevation;
    let died = destPiece.takeDamage(attackPower);
    if (died) {
      activePlayer.addPoints(destPiece.points);
      destCell.clearPiece();
      this.checkWinCondition();
    }
    // Turn book-keeping
    srcPiece.setAttacked(true);
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

  private move(srcCell: Cell, destCell: Cell): void {
    let srcPiece = srcCell.getPiece()!;
    if (!srcPiece.hasBeenActivated()) {
      this.turnService.getActivePlayer().addActivatedPiece(srcPiece);
    }
    srcCell.clearPiece();
    destCell.setPiece(srcPiece);
    srcPiece.setPosition(destCell.position);
    srcPiece.setMoved(true);
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
    return player.getPoints() >= 4;
  }

  public isGameOver(): boolean {
    return this.winningPlayer != null;
  }

  public getWinningPlayer(): Player | null {
    return this.winningPlayer;
  }
}
