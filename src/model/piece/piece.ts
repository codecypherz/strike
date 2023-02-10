import { Player } from "../player";
import { Position } from "../position";

/**
 * Represents the data common to all pieces.
 */
export abstract class Piece {

  readonly name: string;
  readonly imageUrl: string;
  readonly player: Player;
  private position: Position;

  constructor(name: string, imageUrl: string, player: Player) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.player = player;
  }

  setPosition(position: Position): void {
    this.position = position;
  }

  getPosition(): Position {
    return this.position;
  }
}
