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
  sideStrengths = new Map<number, Strength>([
    [Direction.UP.degrees, Strength.STRONG],
    [Direction.RIGHT.degrees, Strength.NEUTRAL],
    [Direction.LEFT.degrees, Strength.NEUTRAL],
    [Direction.DOWN.degrees, Strength.WEAK]
  ]);

  // Per-turn data
  // This data is only cleared when a turn ends.
  moved = false;
  attacked = false;

  // Selected metadata
  // This data is cleared if selection changes and when a turn ends.
  selected = false;
  stagedPosition: Position | null = null;
  stagedDirection: number | null = null;

  // Attack metadata
  // This data is cleared if selection changes, when a turn ends,
  // and when movement or rotation happens.
  stagedAttack = false;
  stagedHealth: number | null = null;
  stagedKnockbackDirection: Direction | null = null;

  constructor(
    readonly name: string,
    readonly imageUrl: string,
    readonly points: number,
    readonly moveRange: number,
    readonly attackPower: number,
    readonly attackRange: number,
    readonly maxHealth: number,
    readonly player: Player) {
    this.health = maxHealth;
    this.direction = player.defaultDirection;
  }

  /**
   * Resets all piece data.
   */
  clearTurnData() {
    if (this.selected) {
      // The caller needs to handle deselection in order to ensure a
      // staged piece is properly reset.
      throw new Error('The piece needs to be deselected before turn end.');
    }
    this.moved = false;
    this.attacked = false;
    this.clearSelectionData();
    this.clearStagedAttackData();
  }

  clearStagedAttackData(): void {
    this.stagedAttack = false;
    this.stagedHealth = null;
    this.stagedKnockbackDirection = null;
  }

  private clearSelectionData(): void {
    this.selected = false;
    this.stagedPosition = null;
    this.stagedDirection = null;
  }

  isStagedAttack(): boolean {
    return this.stagedAttack;
  }

  stageAttack(): void {
    this.stagedAttack = true;
    this.stagedHealth = this.health;
  }

  select(): void {
    this.selected = true;
    this.stagedPosition = this.position;
    this.stagedDirection = this.direction;
  }

  deselect(board: Board): void {
    if (!this.selected) {
      throw new Error('Trying to deselect a non selected piece');
    }

    // Undo the selection by putting the piece back where it was.
    // Note: this is happening even after confirming a move, but it's a no-op.
    const currentCell = board.getCell(this.stagedPosition!);
    currentCell.clearPiece();
    const originalCell = board.getCell(this.position);
    originalCell.clearPiece();
    originalCell.setPiece(this);
    this.position = originalCell.position;

    // Clear metadata.
    this.clearSelectionData();
    this.clearStagedAttackData();
  }

  abstract getPieceType(): string;
  abstract getPieceTypeDescription(): string;

  hasAbility(): boolean {
    return false;
  }

  getAbilityDescription(): string {
    return '';
  }

  getHealth(): number {
    return this.isStagedAttack() ? this.stagedHealth! : this.health;
  }

  getUnstagedHealth(): number {
    return this.health;
  }

  setHealth(health: number): void {
    let newValue = Math.max(0, health); // no negative health allowed.
    this.isStagedAttack() ? this.stagedHealth = newValue : this.health = newValue;
  }

  private takeDamage(damage: number): void {
    this.setHealth(this.getHealth() - damage);
  }

  getBaseAttack(): number {
    return this.attackPower;
  }

  getBaseDefense(): number {
    // By default, pieces don't have defense.
    return 0;
  }

  wouldBeKnockedBack(): boolean {
    if (!this.isStagedAttack()) {
      return false;
    }
    return this.stagedKnockbackDirection != null;
  }

  getKnockbackDirection(): Direction | null {
    return this.stagedKnockbackDirection;
  }

  getAttackPower(cell: Cell): number {
    return this.attackPower + cell.terrain.elevation;
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

  private activate(): void {
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

  canMoveTo(board: Board, destCell: Cell): boolean {
    // Can't move to a cell that already contains a piece.
    if (destCell.hasPiece()) {
      return false;
    }
    // The piece needs to be able to move in the first place.
    if (!this.canMove()) {
      return false;
    }
    // Make sure the destination cell is one of the valid move cells.
    for (let moveCell of this.getMoveCells(board)) {
      if (moveCell.position.equals(destCell.position)) {
        return true;
      }
    }
    return false;
  }

  moveTo(board: Board, destCell: Cell) {
    if (!this.canMoveTo(board, destCell)) {
      throw new Error('Cannot move to this cell: ' + destCell.position.toString());
    }

    const srcCell = board.getCell(this.getPosition());
    srcCell.clearPiece();
    destCell.setPiece(this);
    this.setPosition(destCell.position);
  }

  isMoveStaged(): boolean {
    return this.stagedPosition != null && !this.position.equals(this.stagedPosition);
  }

  confirmMove(): void {
    if (!this.isMoveStaged()) {
      throw new Error('Cannot confirm move if no move is staged.');
    }
    this.position = this.stagedPosition!;
    this.confirmDirection();
    this.moved = true;
    this.activate();
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

  // TODO: Make abstract once all piece types override.
  getAttackCells_(board: Board, pos: Position, dir: Direction, rangeRemaining: number): Set<Cell> {
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

  attack(board: Board): void {
    // TODO: Refine this part to be more elegant.
    // TODO: This breaks for other piece types.
    // Grab the target being attacked.
    let targetCell = null;
    let targetPiece = null;
    for (let attackCell of this.getAttackCells(board)) {
      if (attackCell.hasPiece()) {
        targetCell = attackCell;
        targetPiece = attackCell.getPiece()!;
        break;
      }
    }
    if (!targetCell || !targetPiece) {
      // No attack to be made.
      return;
    }

    // Perform the attack.
    const cell = board.getCell(this.getPosition());
    let attack = this.getAttackPower(cell);
    let defense = targetPiece.getDefense(targetCell);
    const targetSideStrength = this.getTargetSideStrength(targetPiece);
    if (targetSideStrength == Strength.STRONG) {
      defense++;
    } else if (targetSideStrength == Strength.WEAK) {
      attack++;
    }

    if (attack > defense) {
      // Deal damage to the target piece.
      targetPiece.takeDamage(attack - defense);
    } else {
      // If the attack is <= defense, then each piece takes 1 damage and the
      // target piece gets knocked back.
      this.takeDamage(1);
      targetPiece.takeDamage(1);
      // Knockback direction is always in the direction the attacking piece is facing.
      const kbDir = this.getDirection();
      targetPiece.stagedKnockbackDirection = kbDir;
      // Preview the impact of the knockback as well.
      const kbCell = board.getCellInDirection(targetPiece.getPosition(), kbDir);
      if (kbCell) {
        if (kbCell.hasPiece()) {
          // Make both the target piece and this piece take 1 damage.
          kbCell.getPiece()!.takeDamage(1);
          targetPiece.takeDamage(1);
        } else {
          // Move target piece to the empty cell.
          // Don't do this for a staged attack, because it's confusing.
          if (!this.isStagedAttack()) {
            targetCell.clearPiece();
            kbCell.setPiece(targetPiece);
            targetPiece.position = kbCell.position;
          }
        }
      } else {
        // Edge of board, so deal an extra damage to the target.
        targetPiece.takeDamage(1);
      }
    }
    if (!this.isStagedAttack()) {
      this.attacked = true;
      this.activate();
    }
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

  private getSideStrengthWithRotation(dir: Direction): Strength {
    // This is how much rotation it would take to get back to facing up.
    const correction = 360 - this.getDirection().degrees;
    // Add the desired direction to a piece that's facing up to get the proper lookup.
    const sideToLookUp = (dir.degrees + correction) % 360;
    return this.sideStrengths.get(sideToLookUp)!;
  }

  getPosition(): Position {
    return this.selected ? this.stagedPosition! : this.position;
  }

  private setPosition(pos: Position): void {
    if (this.selected) {
      this.stagedPosition = pos;
    } else {
      this.position = pos;
    }
  }

  getDirection(): Direction {
    return Direction.for(this.getDirectionDegrees());
  }

  private getDirectionDegrees(): number {
    return this.selected ? this.stagedDirection! : this.direction;
  }

  rotateClockwise(): void {
    this.setDirection(this.clockwise(this.getDirectionDegrees()));
  }

  rotateCounterClockwise(): void {
    this.setDirection(this.counterClockwise(this.getDirectionDegrees()));
  }

  private clockwise(degrees: number): number {
    return (degrees + 90) % 360;
  }

  private counterClockwise(degrees: number): number {
    return (degrees + 270) % 360;
  }

  private setDirection(degrees: number): void {
    if (this.selected) {
      this.stagedDirection = degrees;
    } else {
      this.direction = degrees;
    }
  }

  confirmDirection(): void {
    if (!this.selected) {
      throw new Error('Trying to confirm direction without being staged');
    }
    this.direction = this.stagedDirection!;
  }
}
