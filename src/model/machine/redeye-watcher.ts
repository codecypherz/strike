import { Blind } from "../ability/blind";
import { Direction } from "../direction";
import { Piece } from "../piece/piece";
import { RamPiece } from "../piece/ram-piece";
import { Strength } from "../strength";

export class RedeyeWatcher extends RamPiece {

  static NAME = 'Redeye Watcher';
  static IMAGE_URL = Piece.IMAGE_PATH + 'redeye_watcher.webp';
  static POINTS = 3;
  static MOVEMENT = 2;
  static ATTACK = 2;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 5;

  constructor() {
    super(
      RedeyeWatcher.NAME,
      RedeyeWatcher.IMAGE_URL,
      RedeyeWatcher.POINTS,
      RedeyeWatcher.MOVEMENT,
      RedeyeWatcher.ATTACK,
      RedeyeWatcher.ATTACK_RANGE,
      RedeyeWatcher.MAX_HEALTH);

    this.sideStrengths = new Map<number, Strength>([
      [Direction.UP.degrees, Strength.WEAK],
      [Direction.RIGHT.degrees, Strength.STRONG],
      [Direction.LEFT.degrees, Strength.STRONG],
      [Direction.DOWN.degrees, Strength.NEUTRAL]
    ]);

    this.setAbility(new Blind(this));
  }
}
