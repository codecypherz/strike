import { Shield } from "../ability/shield";
import { Spray } from "../ability/spray";
import { GunnerPiece } from "../piece/gunner-piece";
import { Piece } from "../piece/piece";
import { RamPiece } from "../piece/ram-piece";

export class Behemoth extends GunnerPiece {

  static NAME = 'Behemoth';
  static IMAGE_URL = Piece.IMAGE_PATH + 'behemoth.webp';
  static POINTS = 5;
  static MOVEMENT = 2;
  static ATTACK = 3;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 10;

  constructor() {
    super(
      Behemoth.NAME,
      Behemoth.IMAGE_URL,
      Behemoth.POINTS,
      Behemoth.MOVEMENT,
      Behemoth.ATTACK,
      Behemoth.ATTACK_RANGE,
      Behemoth.MAX_HEALTH);

    this.setAbility(new Shield(this));
  }
}
