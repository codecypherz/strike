import { Cell } from "../cell";
import { Direction } from "../direction";
import { Piece } from "../piece/piece";
import { RamPiece } from "../piece/rampiece";
import { Strength } from "../strength";
import { Terrain } from "../terrain";

export class Lancehorn extends RamPiece {

  static NAME = 'Lancehorn';
  static IMAGE_URL = Piece.IMAGE_PATH + 'lancehorn.webp';
  static POINTS = 2;
  static MOVEMENT = 2;
  static ATTACK = 2;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 5;

  constructor() {
    super(
      Lancehorn.NAME,
      Lancehorn.IMAGE_URL,
      Lancehorn.POINTS,
      Lancehorn.MOVEMENT,
      Lancehorn.ATTACK,
      Lancehorn.ATTACK_RANGE,
      Lancehorn.MAX_HEALTH);

    this.sideStrengths = new Map<number, Strength>([
      [Direction.UP.degrees, Strength.STRONG],
      [Direction.RIGHT.degrees, Strength.WEAK],
      [Direction.LEFT.degrees, Strength.WEAK],
      [Direction.DOWN.degrees, Strength.NEUTRAL]
    ]);
  }

  override hasAbility(): boolean {
    return true;
  }

  override getAbilityDescription(): string {
    return 'Attack increased by <buff>+1</buff> when attacking from a Hill tile.';
  }

  override getAttackPower(cell: Cell): number {
    const attackPower = super.getAttackPower(cell);
    if (cell.terrain == Terrain.HILL) {
      return attackPower + 1;
    }
    return attackPower;
  }
}
