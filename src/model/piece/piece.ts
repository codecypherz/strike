import { getOnly } from "src/util/sets";
import { AttackCells } from "../attackcells";
import { Board } from "../board";
import { Cell } from "../cell";
import { Direction } from "../direction";
import { MoveCells } from "../movecells";
import { Player } from "../player";
import { Position } from "../position";
import { Strength } from "../strength";
import { Terrain } from "../terrain";

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
  numMoves = 0;
  numAttacks = 0;
  numSprints = 0;
  numOvercharges = 0;

  // Selected metadata
  // This data is cleared if selection changes and when a turn ends.
  selected = false;
  stagedPosition: Position | null = null;
  stagedDirection: number | null = null;
  stagedSprint = false;

  // Attack metadata
  // This data is cleared if selection changes, when a turn ends,
  // and when movement or rotation happens.
  stagedAttack = false;
  stagedHealth: number | null = null;
  stagedKnockbackDirection: Direction | null = null;
  stagedPullDirection: Direction | null = null;
  stagedOvercharge = false;

  constructor(
    readonly board: Board,
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

    player.addPiece(this);
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
    this.numMoves = 0;
    this.numAttacks = 0;
    this.numSprints = 0;
    this.numOvercharges = 0;
    this.clearSelectionData();
    this.clearStagedAttackData();
  }

  clearStagedAttackData(): void {
    this.stagedAttack = false;
    this.stagedHealth = null;
    this.stagedKnockbackDirection = null;
    this.stagedPullDirection = null;
  }

  private clearSelectionData(): void {
    this.selected = false;
    this.stagedPosition = null;
    this.stagedDirection = null;
    this.stagedSprint = false;
    this.stagedOvercharge = false;
  }

  isStagedAttack(): boolean {
    return this.stagedAttack;
  }

  stageAction(): void {
    this.stagedAttack = true;
    this.stagedHealth = this.health;
    this.stagedKnockbackDirection = null;

    // No matter what action you are taking, stage taking 2 damage in overcharge.
    if (this.stagedOvercharge) {
      this.takeDamage_(2);
    }
  }

  select(): void {
    this.selected = true;
    this.stagedPosition = this.position;
    this.stagedDirection = this.direction;
  }

  deselect(): void {
    if (!this.selected) {
      throw new Error('Trying to deselect a non selected piece');
    }

    // Undo the selection by putting the piece back where it was.
    // Note: this is happening even after confirming a move, but it's a no-op.
    const currentCell = this.board.getCell(this.stagedPosition!);
    currentCell.clearPiece();
    const originalCell = this.board.getCell(this.position);
    originalCell.clearPiece();
    originalCell.setPiece(this);
    this.position = originalCell.position;

    // Clear metadata.
    this.clearSelectionData();
    this.clearStagedAttackData();
  }

  abstract getPieceType(): string;
  abstract getPieceTypeDescription(): string;

  takeStartOfTurnAction(): void {
    // Do nothing by default.
  }

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

  /**
   * @param damage The damage to take
   * @returns True if the piece died
   */
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

  wouldBePulled(): boolean {
    if (!this.isStagedAttack()) {
      return false;
    }
    return this.stagedPullDirection != null;
  }

  getPullDirection(): Direction | null {
    return this.stagedPullDirection;
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

  getCell(): Cell {
    return this.board.getCell(this.getPosition());
  }

  hasBeenActivated(): boolean {
    return this.numMoves > 0 || this.numAttacks > 0;
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

  private isLastPiece(): boolean {
    return this.player.isLastPiece(this);
  }

  canOvercharge(): boolean {
    // You can't overcharge if you don't have enough health.
    if (this.getHealth() <= 1) {
      return false;
    }
    if (this.isLastPiece()) {
      // You can't overcharge more than twice with the last piece.
      if (this.numOvercharges >= 2) {
        return false;
      }
      // Special case for last piece where you can overcharge twice.
      // You still have to be spent in some dimension.
      return this.numAttacks >= 2 || this.numMoves >= 2 || this.numSprints >= 2;
    }
    // You can't overcharge if you've overcharged already.
    if (this.numOvercharges >= 1) {
      return false;
    }
    // You can't overcharge unless you are spent in some way.
    return this.numAttacks >= 1 || this.numMoves >= 1 || this.numSprints >= 1;
  }

  overcharge(): void {
    if (!this.selected) {
      throw new Error('Tried to overcharge without being selected');
    }
    if (!this.canOvercharge()) {
      throw new Error('Tried to overcharge when unable to do so');
    }
    this.stagedOvercharge = true;
  }

  canSprint(): boolean {
    if (!this.canMove()) {
      // You can't sprint if you can't move.
      return false;
    }
    if (this.isLastPiece()) {
      // Special case for last piece where you can sprint twice.
      return this.numAttacks <= 1 && this.numMoves <= 1 && this.numSprints <= 1 && !this.stagedOvercharge;
    }
    // You can't sprint if you've moved or attacked.
    return this.numAttacks == 0 && this.numMoves == 0 && this.numSprints == 0 && !this.stagedOvercharge;
  }

  canMove(): boolean {
    if (this.isLastPiece() && this.numMoves >= 2 && !this.stagedOvercharge) {
      return false;
    } else if (!this.isLastPiece() && this.numMoves >= 1 && !this.stagedOvercharge) {
      return false;
    }
    // We don't return false here for move and attack with overcharge.
    // This is handled in the canAttack method which prevents the combination.
    if (!this.player.isActive()) {
      return false;
    }
    if (!this.hasBeenActivated() && !this.player.canActivatePiece()) {
      return false;
    }
    return true;
  }

  canMoveOrSprintTo(destCell: Cell): boolean {
    // Can't move to a cell that already contains a piece.
    if (destCell.hasPiece()) {
      return false;
    }
    // The piece needs to be able to move in the first place.
    if (!this.canMove() && !this.canSprint()) {
      return false;
    }
    // Make sure the destination cell is one of the valid move cells.
    return this.getMoveCells().hasMoveableOrSprintable(destCell);
  }

  moveOrSprintTo(destCell: Cell) {
    if (!this.canMoveOrSprintTo(destCell)) {
      throw new Error('Cannot move to this cell: ' + destCell.position.toString());
    }

    const srcCell = this.board.getCell(this.getPosition());
    srcCell.clearPiece();
    destCell.setPiece(this);
    this.setPosition(destCell.position);

    // Stage as sprinted, if appropriate.
    const moveCells = this.getMoveCells();
    if (this.selected) {
      this.stagedSprint = moveCells.hasSprintable(destCell);
    }
  }

  hasConfirmableMove(): boolean {
    return this.stagedPosition != null && !this.position.equals(this.stagedPosition);
  }

  confirmMove(): void {
    if (!this.hasConfirmableMove()) {
      throw new Error('Cannot confirm move if no move is staged.');
    }
    const cell = this.getCell();
    const moveCells = this.getMoveCells();
    this.position = this.stagedPosition!;
    this.confirmDirection();
    if (moveCells.hasSprintable(cell)) {
      this.numSprints++;
    }
    this.numMoves++;
    if (this.stagedOvercharge) {
      this.numOvercharges++;
      this.takeDamage_(2);
    }
    this.activate();
  }

  getMoveCells(): MoveCells {
    return this.getMoveCells_(this.position, this.canSprint(), this.moveRange);
  }

  getMoveCells_(
    pos: Position, includeSprint: boolean, moveRemaining: number): MoveCells {

    const moveCells = new MoveCells();
    if (!includeSprint && moveRemaining == 0) {
      // Stop at the movement range if not sprinting.
      return moveCells;
    } else if (includeSprint && moveRemaining == -1) {
      // Stop at one further than movement range if sprinting.
      return moveCells;
    }
    for (let cell of this.board.getSurroundingCells(pos)) {
      if (cell.hasPiece()) {
        const piece = cell.getPiece()!;
        if (piece != this) {
          // Can't move through other pieces.
          continue;
        }
        // You can move through yourself.
      }
      if (cell.terrain == Terrain.CHASM && !this.canMoveThroughChasm_()) {
        continue;
      }
      // Can move to this cell.
      if (includeSprint && moveRemaining == 0) {
        // We are at the end of the sprintable range, so this is sprintable.
        moveCells.addSprintable(cell);
      } else {
        moveCells.addMoveable(cell);
      }
      if (cell.terrain == Terrain.MARSH && this.mustStopMoveInMarsh_()) {
        continue;
      }
      // Explore paths at the new point, but with reduced movement.
      // Recurse.
      moveCells.merge(this.getMoveCells_(cell.position, includeSprint, moveRemaining - 1));
    }
    return moveCells;
  }

  canMoveThroughChasm_(): boolean {
    return false;
  }

  mustStopMoveInMarsh_(): boolean {
    return true;
  }

  canAttack(): boolean {
    if (this.isLastPiece()) {
      if (this.numAttacks >= 2 && !this.stagedOvercharge) {
        return false;
      }
      if (this.numSprints >= 2 && !this.stagedOvercharge) {
        return false;
      }
      if (this.numSprints >= 1 && this.stagedSprint) {
        return false;
      }
    } else {
      if (this.numAttacks >= 1 && !this.stagedOvercharge) {
        return false;
      }
      if (this.numSprints >= 1 && !this.stagedOvercharge) {
        return false;
      }
      if (this.numSprints >= 0 && this.stagedSprint) {
        return false;
      }
    }
    if (this.stagedOvercharge && this.hasConfirmableMove()) {
      // Can't move and attack with overcharge.
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

  getAttackCells(): AttackCells {
    return this.getAttackCells_(
      this.getPosition(), this.getDirection(), this.attackRange);
  }

  getAttackCells_(pos: Position, dir: Direction, rangeRemaining: number): AttackCells {
    const attackCells = new AttackCells();
    if (rangeRemaining == 0) {
      return attackCells;
    }
    const cell = this.board.getCellInDirection(pos, dir);
    // Can't run off the this.board.
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
    // You have to be able to move through this terrain in order to attack.
    if (cell.terrain == Terrain.CHASM && !this.canMoveThroughChasm_()) {
      return attackCells;
    }
    // This cell is attackable, but there's nothing there.
    attackCells.inRange.add(cell);
    // Keep looking for something to attack at the new point, but with reduced range.
    // Recurse.
    return attackCells.merge(
      this.getAttackCells_(cell.position, dir, rangeRemaining - 1));
  }

  hasConfirmableAttack(): boolean {
    return this.hasConfirmableAttack_(this.getAttackCells());
  }

  hasConfirmableAttack_(attackCells: AttackCells) {
    return attackCells.toAttack.size == 1;
  }

  attack(): AttackCells {
    // Determine the piece and cell being attacked.
    const attackCells = this.getAttackCells();
    if (!this.hasConfirmableAttack_(attackCells)) {
      return attackCells;
    }
    if (attackCells.toAttack.size != 1) {
      // Base piece does not support attacking more than 1 piece at a time.
      throw new Error('This piece only supports attacking 1 piece at a time');
    }
    const targetCell = getOnly(attackCells.toAttack);
    if (!targetCell.hasPiece()) {
      throw new Error('This piece only attacks other pieces');
    }
    const targetPiece = targetCell.getPiece()!;

    // Maybe update some movement since that can be combined with the attack.
    this.confirmMovementIfNotStaged_();

    // Calculate attack and defense.
    const attack = this.getAttackPowerForAttack_(targetPiece);
    const defense = this.getDefenseForAttack_(targetPiece);

    // Perform the attack.
    if (attack > defense) {
      // Deal damage to the target piece.
      targetPiece.takeDamage_(attack - defense);
    } else {
      // If the attack is <= defense, then each piece takes a damage
      // and knocks back the other piece.
      this.takeDamage_(1);
      targetPiece.takeDamage_(1);
      if (this.armorBreakKnocksBack_()) {
        targetPiece.knockback_(this.getDirection());
      }
    }

    this.confirmAttackIfNotStaged_();
    return attackCells;
  }

  getAttackPowerForAttack_(targetPiece: Piece): number {
    const cell = this.board.getCell(this.getPosition());
    let attack = this.getAttackPower(cell);
    const targetSideStrength = this.getTargetSideStrength_(targetPiece);
    if (targetSideStrength == Strength.WEAK) {
      attack++;
    }
    return attack;
  }

  getDefenseForAttack_(targetPiece: Piece): number {
    const targetCell = this.board.getCell(targetPiece.getPosition());
    let defense = targetPiece.getDefense(targetCell);
    const targetSideStrength = this.getTargetSideStrength_(targetPiece);
    if (targetSideStrength == Strength.STRONG) {
      defense++;
    }
    return defense;
  }

  armorBreakKnocksBack_(): boolean {
    return true;
  }

  confirmMovementIfNotStaged_(): void {
    if (!this.isStagedAttack()) {
      this.confirmDirection();
      if (this.hasConfirmableMove()) {
        this.confirmMove();
      }
    }
  }

  confirmAttackIfNotStaged_(): void {
    if (!this.isStagedAttack()) {
      this.numAttacks++;
      if (this.stagedOvercharge) {
        this.numOvercharges++;
        this.takeDamage_(2);
      }
      this.activate();
    }
  }

  /**
   * Knocks the piece back in the direction indicated.
   * @param kbDir The direction of the knockback.
   * @returns True if the piece got knocked back (or would be).
   */
  knockback_(kbDir: Direction): boolean {
    this.stagedKnockbackDirection = kbDir;
    // Preview the impact of the knockback as well.
    const kbCell = this.board.getCellInDirection(this.getPosition(), kbDir);
    if (kbCell) {
      if (kbCell.hasPiece()) {
        // This piece must take an extra damage because of the collision.
        this.takeDamage_(1);
        // Collatoral damage to the piece that got knocked into.
        kbCell.getPiece()!.takeDamage_(1);
      } else {
        // Move this knocked back piece to the empty cell.
        // Don't do this for a staged attack, because it's confusing.
        // Don't do this if the piece died.
        if (!this.isStagedAttack() && this.getHealth() > 0) {
          this.getCell().clearPiece();
          kbCell.setPiece(this);
          this.position = kbCell.position;
        }
        return true;
      }
    } else {
      // Edge of board, so deal an extra damage to the target.
      this.takeDamage_(1);
    }
    return false;
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

  canRotate(): boolean {
    return this.canMove() || this.canAttack();
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
