/**
 * A cell is a portion of the board. A cell has a certain type of terrain
 * and it may contain a piece.
 */
export class Player {

  readonly name: string;
  private active: boolean = false;

  constructor(name: string) {
    this.name = name;
    this.active = false;
  }

  setActive(active: boolean): void {
    this.active = active;
  }

  isActive(): boolean {
    return this.active;
  }
}
