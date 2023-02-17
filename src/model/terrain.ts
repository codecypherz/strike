export class Terrain {

  static CHASM = new Terrain('chasm', -2);
  static MARSH = new Terrain('marsh', -1);
  static GRASSLAND = new Terrain('grassland', 0);
  static FOREST = new Terrain('forest', 1);
  static HILL = new Terrain('hill', 2);
  static MOUNTAIN = new Terrain('mountain', 3);

  private constructor(readonly type: string, readonly elevation: number) {
  }
}
