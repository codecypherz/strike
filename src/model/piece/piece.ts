import { Player } from "../player";
import { Position } from "../position";

/**
 * Represents the data common to all pieces.
 */
export abstract class Piece {

  static IMAGE_PATH = '/images/machine/';

  // Semi-invalid default, but don't want nullability.
  position = new Position(0, 0);
  private health: number = 0;

  // Per-turn data
  moved = false;
  attacked = false;
  selected = false;
  stagedPosition: Position | null = null;

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
  }

  public clearTurnData() {
    this.moved = false;
    this.attacked = false;
    this.stagedPosition = null;
  }

  public getHealth(): number {
    return this.health;
  }

  /**
   * Makes this piece take some damage
   * @param amount The amount of damage to take
   * @returns True if the piece died
   */
  public takeDamage(amount: number): boolean {
    this.health = Math.max(0, this.health - amount);
    return this.health == 0;
  }

  public hasBeenActivated(): boolean {
    return this.moved || this.attacked;
  }
}
