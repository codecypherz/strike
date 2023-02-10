/**
 * A cell is a portion of the board. A cell has a certain type of terrain
 * and it may contain a piece.
 */
export class Player {

  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }
}
