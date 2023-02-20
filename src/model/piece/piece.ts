import { Board } from "../board";
import { Cell } from "../cell";
import { Player } from "../player";
import { Position } from "../position";
import { Terrain } from "../terrain";
import { Direction } from "./direction";
import { Strength } from "./strength";

/**
 * Represents the data common to all pieces.
 */
export abstract class Piece {

  static IMAGE_PATH = '/images/machine/';

  // Semi-invalid default, but don't want nullability.
  position = new Position(0, 0);
  private health = 0;
  private direction = 0; // Valid values: 0, 90, 180, 270
  private sideStrengths = new Map<number, Strength>([
    [Direction.UP.degrees, Strength.STRONG],
    [Direction.RIGHT.degrees, Strength.NEUTRAL],
    [Direction.LEFT.degrees, Strength.NEUTRAL],
    [Direction.DOWN.degrees, Strength.WEAK]
  ]);

  // Per-turn data
  moved = false;
  attacked = false;
  selected = false;
  stagedPosition: Position | null = null;
  stagedDirection: number | null = null;

  constructor(
    readonly name: string,
    readonly imageUrl: string,
    readonly points: number,
    readonly moveRange: number,
    readonly attack: number,
    readonly attackRange: number,
    readonly maxHealth: number,
    readonly player: Player) {
    this.health = maxHealth;
    this.direction = player.defaultDirection;
  }

  clearTurnData() {
    this.moved = false;
    this.attacked = false;
    this.stagedPosition = null;
    this.stagedDirection = null;
  }

  getHealth(): number {
    return this.health;
  }

  getAttack(cell: Cell): number {
    return this.attack + cell.terrain.elevation;
  }

  getDefense(cell: Cell): number {
    return cell.terrain.elevation;
  }

  getFrontStrength(): Strength {
    return this.sideStrengths.get(Direction.UP.degrees)!;
  }

  getRightStrength() {
    return this.sideStrengths.get(Direction.RIGHT.degrees)!;
  }

  getLeftStrength() {
    return this.sideStrengths.get(Direction.LEFT.degrees)!;
  }

  getBackStrength() {
    return this.sideStrengths.get(Direction.DOWN.degrees)!;
  }

  getCell(board: Board): Cell {
    return board.getCell(this.getPosition());
  }

  hasBeenActivated(): boolean {
    return this.moved || this.attacked;
  }

  canBeActivated(): boolean {
    // Can't activate unless it's this player's turn.
    if (!this.player.isActive()) {
      return false;
    }
    // True if this piece has already been activated.
    // TODO: Return false if both a move and attack have been made?
    if (this.hasBeenActivated()) {
      return true;
    }
    // Piece hasn't been activated, so check if the player can still do that.
    return this.player.canActivatePiece();
  }

  activate(): void {
    this.player.addActivatedPiece(this);
  }

  canMove(): boolean {
    // Can't move twice... for now.
    // TODO: Support overdrive.
    if (this.moved) {
      return false;
    }
    if (!this.player.isActive()) {
      return false;
    }
    if (!this.hasBeenActivated() && !this.player.canActivatePiece()) {
      return false;
    }
    return true;
  }

  canMoveTo(board: Board, cell: Cell): boolean {
    if (!this.canMove()) {
      return false;
    }
    for (let moveCell of this.getMoveCells(board)) {
      if (moveCell.position.equals(cell.position)) {
        return true;
      }
    }
    return false;
  }

  getMoveCells(board: Board): Array<Cell> {
    return Array.from(this.getMoveCells_(board, this.position, this.moveRange));
  }

  private getMoveCells_(board: Board, pos: Position, moveRemaining: number): Set<Cell> {
    let cells = new Set<Cell>();
    if (moveRemaining == 0) {
      return cells;
    }
    for (let cell of board.getSurroundingCells(pos)) {
      if (cell.hasPiece()) {
        const piece = cell.getPiece()!;
        if (piece != this) {
          // Can't move through other pieces.
          continue;
        }
        // You can move through yourself.
      }
      if (cell.terrain == Terrain.CHASM) {
        // Can't move through chasms.
        continue;
      }
      // Can move to this cell.
      cells.add(cell);
      if (cell.terrain == Terrain.MARSH) {
        // If you hit a marsh, you have to stop movement.
        continue;
      }
      // Explore paths at the new point, but with reduced movement.
      // Recurse.
      let subsequentCells = this.getMoveCells_(board, cell.position, moveRemaining - 1);
      subsequentCells.forEach(cells.add, cells);
    }
    return cells;
  }

  canAttack(): boolean {
    // Can't attack twice... for now.
    // TODO: Support overdrive.
    if (this.attacked) {
      return false;
    }
    if (!this.player.isActive()) {
      return false;
    }
    if (!this.hasBeenActivated() && !this.player.canActivatePiece()) {
      return false;
    }
    return true;
  }

  getAttackCells(board: Board): Array<Cell> {
    return Array.from(
      this.getAttackCells_(
        board, this.getPosition(), this.getDirection(), this.attackRange));
  }

  private getAttackCells_(board: Board, pos: Position, dir: Direction, rangeRemaining: number): Set<Cell> {
    let cells = new Set<Cell>();
    if (rangeRemaining == 0) {
      return cells;
    }
    const cell = board.getCellInDirection(pos, dir);
    // Can't run off the board.
    if (!cell) {
      return cells;
    }
    if (cell.hasPiece()) {
      const piece = cell.getPiece()!;
      // Can't attack your own pieces nor can you attack through them.
      if (this.player.equals(piece.player)) {
        return cells;
      } else {
        // Found a piece to attack, no need to search further.
        cells.add(cell);
        return cells;
      }
    }
    // This cell is attackable, but there's nothing there.
    cells.add(cell);
    // Keep looking for something to attack at the new point, but with reduced range.
    // Recurse.
    let subsequentCells = this.getAttackCells_(board, cell.position, dir, rangeRemaining - 1);
    subsequentCells.forEach(cells.add, cells);
    return cells;
  }

  attackPiece(cell: Cell, targetCell: Cell, targetPiece: Piece): void {
    let attack = this.getAttack(cell);
    console.info('Target side strength:', this.getTargetSideStrength(targetPiece));
    // TODO: Incorporate side strength once working.
    const defense = targetPiece.getDefense(targetCell);
    const damage = Math.max(0, attack - defense);
    targetPiece.health = Math.max(0, targetPiece.health - damage);
    this.attacked = true;
    this.activate();
  }

  private getTargetSideStrength(targetPiece: Piece): Strength {
    const pos = this.getPosition();
    const targetPos = targetPiece.getPosition();
    const direction = this.getDirection();
    if (direction == Direction.UP) {
      return targetPiece.getSideStrengthWithRotation(Direction.DOWN);
    } else if (direction == Direction.DOWN) {
      return targetPiece.getSideStrengthWithRotation(Direction.UP);
    } else if (direction == Direction.LEFT) {
      return targetPiece.getSideStrengthWithRotation(Direction.RIGHT);
    } else if (direction == Direction.RIGHT) {
      return targetPiece.getSideStrengthWithRotation(Direction.LEFT);
    }
    throw new Error('Unhandled direction');
  }
  
  getSideStrengthWithRotation(dir: Direction): Strength {
    const sideToLookUp = (dir.degrees + this.getDirection().degrees) % 360;
    console.info('looking up side:', sideToLookUp);
    return this.sideStrengths.get(sideToLookUp)!;
  }

  getPosition(): Position {
    return this.selected ? this.stagedPosition! : this.position;
  }

  getDirection(): Direction {
    const degrees = this.selected ? this.stagedDirection! : this.direction;
    return Direction.for(degrees);
  }

  confirmDirection(): void {
    if (!this.selected) {
      throw new Error('Trying to confirm direction without being staged');
    }
    this.direction = this.stagedDirection!;
  }

  rotateClockwise(): void {
    if (this.selected) {
      this.stagedDirection = this.clockwise(this.stagedDirection!);
    } else {
      this.direction = this.clockwise(this.direction);
    }
  }

  rotateCounterClockwise(): void {
    if (this.selected) {
      this.stagedDirection = this.counterClockwise(this.stagedDirection!);
    } else {
      this.direction = this.counterClockwise(this.direction);
    }
  }

  private clockwise(degrees: number): number {
    return (degrees + 90) % 360;
  }

  private counterClockwise(degrees: number): number {
    return (degrees + 270) % 360;
  }

  select(): void {
    this.selected = true;
    this.stagedPosition = this.position;
    this.stagedDirection = this.direction;
  }

  deselect(): void {
    this.selected = false;
    this.stagedPosition = null;
    this.stagedDirection = null;
  }
}
