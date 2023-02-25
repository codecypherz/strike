export class Direction {

  static UP = new Direction(0);
  static RIGHT = new Direction(90);
  static DOWN = new Direction(180);
  static LEFT = new Direction(270);

  private constructor(readonly degrees: number) {}

  static for(degrees: number): Direction {
    if (degrees == Direction.UP.degrees) {
      return Direction.UP;
    } else if (degrees == Direction.RIGHT.degrees) {
      return Direction.RIGHT;
    } else if (degrees == Direction.DOWN.degrees) {
      return Direction.DOWN;
    } else if (degrees == Direction.LEFT.degrees) {
      return Direction.LEFT;
    }
    throw new Error('No Direction for ' + degrees);
  }
}