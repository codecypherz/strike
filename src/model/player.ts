/**
 * A cell is a portion of the board. A cell has a certain type of terrain
 * and it may contain a piece.
 */
export class Player {

  readonly id: string;
  readonly name: string;
  private active: boolean = false;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.active = false;
  }

  setActive(active: boolean): void {
    this.active = active;
  }

  toggleActive(): void {
    this.active = !this.active;
  }

  isActive(): boolean {
    return this.active;
  }
}
