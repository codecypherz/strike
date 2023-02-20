export class Terrain {

  static CHASM = new Terrain(
    'chasm',
    -2,
    'Only flying types can cross chasms.');
  static MARSH = new Terrain(
    'marsh',
    -1,
    'You must end your movement when entering a marsh.');
  static GRASSLAND = new Terrain(
    'grassland',
    0,
    '');
  static FOREST = new Terrain(
    'forest',
    1,
    '');
  static HILL = new Terrain(
    'hill',
    2,
    '');
  static MOUNTAIN = new Terrain(
    'mountain',
    3,
    '');

  private constructor(
    readonly type: string,
    readonly elevation: number,
    readonly note: string) {
  }
}
