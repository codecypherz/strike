import { Sweep } from "../ability/sweep";
import { GunnerPiece } from "../piece/gunner-piece";
import { Piece } from "../piece/piece";

export class Ravager extends GunnerPiece {

  static NAME = 'Ravager';
  static IMAGE_URL = Piece.IMAGE_PATH + 'ravager.webp';
  static POINTS = 4;
  static MOVEMENT = 2;
  static ATTACK = 2;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 9;

  constructor() {
    super(
      Ravager.NAME,
      Ravager.IMAGE_URL,
      Ravager.POINTS,
      Ravager.MOVEMENT,
      Ravager.ATTACK,
      Ravager.ATTACK_RANGE,
      Ravager.MAX_HEALTH);

    this.setAbility(new Sweep(this));
  }
}
