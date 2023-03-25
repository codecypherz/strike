import { Whiplash } from "../ability/whiplash";
import { Direction } from "../direction";
import { Piece } from "../piece/piece";
import { SwoopPiece } from "../piece/swoop-piece";
import { Strength } from "../strength";

export class Dreadwing extends SwoopPiece {

  static NAME = 'Dreadwing';
  static IMAGE_URL = Piece.IMAGE_PATH + 'dreadwing.jpg';
  static POINTS = 5;
  static MOVEMENT = 2;
  static ATTACK = 3;
  static ATTACK_RANGE = 3;
  static MAX_HEALTH = 9;

  constructor() {
    super(
      Dreadwing.NAME,
      Dreadwing.IMAGE_URL,
      Dreadwing.POINTS,
      Dreadwing.MOVEMENT,
      Dreadwing.ATTACK,
      Dreadwing.ATTACK_RANGE,
      Dreadwing.MAX_HEALTH);

    this.setAbility(new Whiplash(this));
  }
}
