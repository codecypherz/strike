import { Player } from "../player";
import { Position } from "../position";

/**
 * Represents the data common to all pieces.
 */
export abstract class Piece {

  // Semi-invalid default, but don't want nullability.
  private position: Position = new Position(0, 0);
  private health: number = 0;

  constructor(
    readonly name: string,
    readonly points: number,
    readonly movement: number,
    readonly attack: number,
    readonly attackRange: number,
    readonly maxHealth: number,
    readonly player: Player) {
    this.health = maxHealth;
  }

  public setPosition(position: Position): void {
    this.position = position;
  }

  public getPosition(): Position {
    return this.position;
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
}
