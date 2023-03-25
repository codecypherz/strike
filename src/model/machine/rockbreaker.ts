import { AlterTerrain } from "../ability/alter-terrain";
import { Direction } from "../direction";
import { GunnerPiece } from "../piece/gunner-piece";
import { Piece } from "../piece/piece";
import { Strength } from "../strength";

export class Rockbreaker extends GunnerPiece {

  static NAME = 'Rockbreaker';
  static IMAGE_URL = Piece.IMAGE_PATH + 'rockbreaker.webp';
  static POINTS = 6;
  static MOVEMENT = 3;
  static ATTACK = 3;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 9;

  constructor() {
    super(
      Rockbreaker.NAME,
      Rockbreaker.IMAGE_URL,
      Rockbreaker.POINTS,
      Rockbreaker.MOVEMENT,
      Rockbreaker.ATTACK,
      Rockbreaker.ATTACK_RANGE,
      Rockbreaker.MAX_HEALTH);

    this.sideStrengths = new Map<number, Strength>([
      [Direction.UP.degrees, Strength.NEUTRAL],
      [Direction.RIGHT.degrees, Strength.STRONG],
      [Direction.LEFT.degrees, Strength.STRONG],
      [Direction.DOWN.degrees, Strength.WEAK]
    ]);

    this.setAbility(new AlterTerrain(this));
  }
}
