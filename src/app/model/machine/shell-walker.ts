import { Shield } from "../ability/shield";
import { Direction } from "../direction";
import { MeleePiece } from "../piece/melee-piece";
import { Piece } from "../piece/piece";
import { Strength } from "../strength";

export class ShellWalker extends MeleePiece {

  static NAME = 'Shell Walker';
  static IMAGE_URL = Piece.IMAGE_PATH + 'shell_walker.webp';
  static POINTS = 3;
  static MOVEMENT = 2;
  static ATTACK = 2;
  static ATTACK_RANGE = 1;
  static MAX_HEALTH = 7;

  constructor() {
    super(
      ShellWalker.NAME,
      ShellWalker.IMAGE_URL,
      ShellWalker.POINTS,
      ShellWalker.MOVEMENT,
      ShellWalker.ATTACK,
      ShellWalker.ATTACK_RANGE,
      ShellWalker.MAX_HEALTH);

    this.sideStrengths = new Map<number, Strength>([
      [Direction.UP.degrees, Strength.STRONG],
      [Direction.RIGHT.degrees, Strength.STRONG],
      [Direction.LEFT.degrees, Strength.NEUTRAL],
      [Direction.DOWN.degrees, Strength.WEAK]
    ]);

    this.setAbility(new Shield(this));
  }
}
