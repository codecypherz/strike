/**
 * A cell is a portion of the board. A cell has a certain type of terrain
 * and it may contain a piece.
 */
export class Player {

  readonly id: string;
  readonly name: string;

  private active: boolean = false;
  private points: number = 0;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  reset(): void {
    this.active = false;
    this.points = 0;
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

  setPoints(points: number): void {
    this.points = points;
  }

  addPoints(points: number): void {
    this.points += points;
  }

  getPoints(): number {
    return this.points;
  }
}
