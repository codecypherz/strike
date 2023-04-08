import { Retaliate } from "../ability/retaliate";
import { Direction } from "../direction";
import { GunnerPiece } from "../piece/gunner-piece";
import { Piece } from "../piece/piece";
import { Strength } from "../strength";

export class ApexClawstrider extends GunnerPiece {

  static NAME = 'Apex Clawstrider';
  static IMAGE_URL = Piece.IMAGE_PATH + 'clawstrider.webp';
  static POINTS = 5;
  static MOVEMENT = 2;
  static ATTACK = 3;
  static ATTACK_RANGE = 1;
  static MAX_HEALTH = 8;

  constructor() {
    super(
      ApexClawstrider.NAME,
      ApexClawstrider.IMAGE_URL,
      ApexClawstrider.POINTS,
      ApexClawstrider.MOVEMENT,
      ApexClawstrider.ATTACK,
      ApexClawstrider.ATTACK_RANGE,
      ApexClawstrider.MAX_HEALTH);

    this.sideStrengths = new Map<number, Strength>([
      [Direction.UP.degrees, Strength.STRONG],
      [Direction.RIGHT.degrees, Strength.STRONG],
      [Direction.LEFT.degrees, Strength.STRONG],
      [Direction.DOWN.degrees, Strength.WEAK]
    ]);

    this.setAbility(new Retaliate(this));
  }
}
