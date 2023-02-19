import { Player } from "../player";
import { Position } from "../position";
import { Direction } from "./direction";

/**
 * Represents the data common to all pieces.
 */
export abstract class Piece {

  static IMAGE_PATH = '/images/machine/';

  // Semi-invalid default, but don't want nullability.
  position = new Position(0, 0);
  private health = 0;
  private direction = 0; // Valid values: 0, 90, 180, 270

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
    readonly movement: number,
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

  /**
   * Makes this piece take some damage
   * @param amount The amount of damage to take
   * @returns True if the piece died
   */
  takeDamage(amount: number): boolean {
    this.health = Math.max(0, this.health - amount);
    return this.health == 0;
  }

  hasBeenActivated(): boolean {
    return this.moved || this.attacked;
  }

  getDirection(): Direction {
    const degrees = this.isStaged() ? this.stagedDirection! : this.direction;
    return Direction.for(degrees);
  }

  confirmDirection(): void {
    if (!this.isStaged()) {
      throw new Error('Trying to confirm direction without being staged');
    }
    this.direction = this.stagedDirection!;
  }

  rotateClockwise(): void {
    if (this.isStaged()) {
      this.stagedDirection = this.clockwise(this.stagedDirection!);
    } else {
      this.direction = this.clockwise(this.direction);
    }
  }

  rotateCounterClockwise(): void {
    if (this.isStaged()) {
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

  isStaged(): boolean {
    return this.stagedPosition != null;
  }
}
