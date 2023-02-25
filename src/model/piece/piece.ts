import { Board } from "../board";
import { Cell } from "../cell";
import { Player } from "../player";
import { Position } from "../position";
import { Terrain } from "../terrain";
import { AttackCells } from "./attackcells";
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
    this.stagedKnockbackDirection = null;
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

  takeDamage_(damage: number): void {
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

  getAttackCells(board: Board): AttackCells {
    return this.getAttackCells_(
      board, this.getPosition(), this.getDirection(), this.attackRange);
  }

  // TODO: Make abstract once all piece types override.
  getAttackCells_(board: Board, pos: Position, dir: Direction, rangeRemaining: number): AttackCells {
    const attackCells = new AttackCells();
    if (rangeRemaining == 0) {
      return attackCells;
    }
    const cell = board.getCellInDirection(pos, dir);
    // Can't run off the board.
    if (!cell) {
      return attackCells;
    }
    if (cell.hasPiece()) {
      const piece = cell.getPiece()!;
      // Can't attack your own pieces nor can you attack through them.
      if (this.player.equals(piece.player)) {
        return attackCells;
      } else {
        // Found a piece to attack.
        attackCells.toAttack.add(cell);
        return attackCells;
      }
    }
    // This cell is attackable, but there's nothing there.
    attackCells.inRange.add(cell);
    // Keep looking for something to attack at the new point, but with reduced range.
    // Recurse.
    return attackCells.merge(
      this.getAttackCells_(board, cell.position, dir, rangeRemaining - 1));
  }

  hasConfirmableAttack(board: Board): boolean {
    return this.hasConfirmableAttack_(this.getAttackCells(board));
  }

  hasConfirmableAttack_(attackCells: AttackCells) {
    return attackCells.toAttack.size == 1;
  }

  attack(board: Board): void {
    // Determine the piece and cell being attacked.
    const attackCells = this.getAttackCells(board);
    if (!this.hasConfirmableAttack_(attackCells)) {
      return;
    }
    if (attackCells.toAttack.size != 1) {
      // Base piece does not support attacking more than 1 piece at a time.
      throw new Error('This piece only supports attacking 1 piece at a time');
    }
    const targetCell = Array.from(attackCells.toAttack)[0];
    if (!targetCell.hasPiece()) {
      throw new Error('This piece only attacks other pieces');
    }
    const targetPiece = targetCell.getPiece()!;

    // Maybe update some movement since that can be combined with the attack.
    this.confirmMovementIfNotStaged_();

    // Calculate attack and defense.
    const attack = this.getAttackPowerForAttack_(board, targetPiece);
    const defense = this.getDefenseForAttack_(board, targetPiece);

    // Perform the attack.
    if (attack > defense) {
      // Deal damage to the target piece.
      targetPiece.takeDamage_(attack - defense);
    } else {
      // If the attack is <= defense, then this piece takes a damage
      // and knocks back the other piece.
      // Knockback direction is always in the direction the attacking piece is facing.
      this.takeDamage_(1);
      targetPiece.knockback(this.getDirection(), board);
    }

    this.activatePieceIfNotStaged_();
  }

  getAttackPowerForAttack_(board: Board, targetPiece: Piece): number {
    const cell = board.getCell(this.getPosition());
    let attack = this.getAttackPower(cell);
    const targetSideStrength = this.getTargetSideStrength_(targetPiece);
    if (targetSideStrength == Strength.WEAK) {
      attack++;
    }
    return attack;
  }

  getDefenseForAttack_(board: Board, targetPiece: Piece): number {
    const targetCell = board.getCell(targetPiece.getPosition());
    let defense = targetPiece.getDefense(targetCell);
    const targetSideStrength = this.getTargetSideStrength_(targetPiece);
    if (targetSideStrength == Strength.STRONG) {
      defense++;
    }
    return defense;
  }

  confirmMovementIfNotStaged_(): void {
    if (!this.isStagedAttack()) {
      this.confirmDirection();
      if (this.isMoveStaged()) {
        this.confirmMove();
      }
    }
  }

  activatePieceIfNotStaged_(): void {
    if (!this.isStagedAttack()) {
      this.attacked = true;
      this.activate();
    }
  }

  private knockback(kbDir: Direction, board: Board): void {
    // Take 1 damage just for being knocked back.
    this.takeDamage_(1);
    this.stagedKnockbackDirection = kbDir;
    // Preview the impact of the knockback as well.
    const kbCell = board.getCellInDirection(this.getPosition(), kbDir);
    if (kbCell) {
      if (kbCell.hasPiece()) {
        // This piece must take an extra damage because of the collision.
        this.takeDamage_(1);
        // Collatoral damage to the piece that got knocked into.
        kbCell.getPiece()!.takeDamage_(1);
      } else {
        // Move this knocked back piece to the empty cell.
        // Don't do this for a staged attack, because it's confusing.
        if (!this.isStagedAttack()) {
          this.getCell(board).clearPiece();
          kbCell.setPiece(this);
          this.position = kbCell.position;
        }
      }
    } else {
      // Edge of board, so deal an extra damage to the target.
      this.takeDamage_(1);
    }
  }

  getTargetSideStrength_(targetPiece: Piece): Strength {
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

  rotateClockwise(): void {
    this.setDirectionDegrees((this.getDirectionDegrees() + 90) % 360);
  }

  rotateCounterClockwise(): void {
    this.setDirectionDegrees((this.getDirectionDegrees() + 270) % 360);
  }

  rotate180() {
    this.setDirectionDegrees((this.getDirectionDegrees() + 180) % 360);
  }

  private getDirectionDegrees(): number {
    return this.selected ? this.stagedDirection! : this.direction;
  }

  private setDirectionDegrees(degrees: number): void {
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
