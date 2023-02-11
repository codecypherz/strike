
/**
 * A cell is a portion of the board. A cell has a certain type of terrain
 * and it may contain a piece.
 */
export class Player {

  readonly id: string;
  readonly name: string;

  private active: boolean = false;
  private points: number = 0;

  // Turn metadata
  private attacks: number = 0;
  private moves: number = 0;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  reset(): void {
    this.active = false;
    this.points = 0;
    this.clearTurnData();
  }

  canEndTurn(): boolean {
    console.log('moves', this.moves);
    return this.moves == 2;
  }

  isTurnOver(): boolean {
    // TODO: Handle starting with a single piece.
    return this.attacks == 2;
  }

  canMove(): boolean {
    return this.moves < 2;
  }

  incrementAttacks() {
    this.attacks++;
  }

  incrementMoves() {
    this.moves++;
  }

  clearTurnData(): void {
    this.attacks = 0;
    this.moves = 0;
  }

  setActive(active: boolean): void {
    this.active = active;
  }

  toggleActive(): void {
    this.clearTurnData();
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
