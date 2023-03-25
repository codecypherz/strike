import { Sweep } from "../ability/sweep";
import { Piece } from "../piece/piece";
import { PullPiece } from "../piece/pull-piece";

export class Tremortusk extends PullPiece {

  static NAME = 'Tremortusk';
  static IMAGE_URL = Piece.IMAGE_PATH + 'tremortusk.webp';
  static POINTS = 5;
  static MOVEMENT = 2;
  static ATTACK = 3;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 10;

  constructor() {
    super(
      Tremortusk.NAME,
      Tremortusk.IMAGE_URL,
      Tremortusk.POINTS,
      Tremortusk.MOVEMENT,
      Tremortusk.ATTACK,
      Tremortusk.ATTACK_RANGE,
      Tremortusk.MAX_HEALTH);

    this.setAbility(new Sweep(this));
  }
}
