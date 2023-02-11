import { Player } from "../player";
import { Position } from "../position";

/**
 * Represents the data common to all pieces.
 */
export abstract class Piece {

  // Semi-invalid default, but don't want nullability.
  private position: Position = new Position(0, 0);

  constructor(
    readonly name: string,
    readonly points: number,
    readonly movement: number,
    readonly attack: number,
    readonly attackRange: number,
    readonly health: number,
    readonly player: Player) {
  }

  setPosition(position: Position): void {
    this.position = position;
  }

  getPosition(): Position {
    return this.position;
  }
}
