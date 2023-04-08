import { Empower } from "../ability/empower";
import { GunnerPiece } from "../piece/gunner-piece";
import { Piece } from "../piece/piece";

export class Longleg extends GunnerPiece {

  static NAME = 'Longleg';
  static IMAGE_URL = Piece.IMAGE_PATH + 'longleg.webp';
  static POINTS = 2;
  static MOVEMENT = 4;
  static ATTACK = 1;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 6;

  constructor() {
    super(
      Longleg.NAME,
      Longleg.IMAGE_URL,
      Longleg.POINTS,
      Longleg.MOVEMENT,
      Longleg.ATTACK,
      Longleg.ATTACK_RANGE,
      Longleg.MAX_HEALTH);

    this.setAbility(new Empower(this));
  }
}
