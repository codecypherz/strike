import { Player } from "../player";
import { Position } from "../position";

/**
 * Represents the data common to all pieces.
 */
export abstract class Piece {

  private position: Position;

  constructor(
    readonly name: string,
    readonly points: number,
    readonly movement: number,
    readonly player: Player) {
  }

  setPosition(position: Position): void {
    this.position = position;
  }

  getPosition(): Position {
    return this.position;
  }
}
