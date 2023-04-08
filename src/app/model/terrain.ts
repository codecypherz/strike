export class Terrain {

  static CHASM = new Terrain(
    'chasm',
    -2,
    'Gives <debuff>-2</debuff> to Combat Power.',
    'Only flying types can cross chasms.');
  static MARSH = new Terrain(
    'marsh',
    -1,
    'Gives <debuff>-1</debuff> to Combat Power.',
    'You must end your movement when entering a marsh.');
  static GRASSLAND = new Terrain(
    'grassland',
    0,
    'Does not modify combat power.',
    '');
  static FOREST = new Terrain(
    'forest',
    1,
    'Gives <buff>+1</buff> to Combat Power.',
    '');
  static HILL = new Terrain(
    'hill',
    2,
    'Gives <buff>+2</buff> to Combat Power.',
    '');
  static MOUNTAIN = new Terrain(
    'mountain',
    3,
    'Gives <buff>+3</buff> to Combat Power.',
    '');

  private constructor(
    readonly type: string,
    readonly elevation: number,
    readonly description: string,
    readonly note: string) {
  }
}
