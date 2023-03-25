import { Burn } from "../ability/burn";
import { GunnerPiece } from "../piece/gunner-piece";
import { MeleePiece } from "../piece/melee-piece";
import { Piece } from "../piece/piece";

export class ElementalClawstrider extends GunnerPiece {

  static NAME = 'Elemental Clawstrider';
  static IMAGE_URL = Piece.IMAGE_PATH + 'clawstrider.webp';
  static POINTS = 4;
  static MOVEMENT = 2;
  static ATTACK = 3;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 8;

  constructor() {
    super(
      ElementalClawstrider.NAME,
      ElementalClawstrider.IMAGE_URL,
      ElementalClawstrider.POINTS,
      ElementalClawstrider.MOVEMENT,
      ElementalClawstrider.ATTACK,
      ElementalClawstrider.ATTACK_RANGE,
      ElementalClawstrider.MAX_HEALTH);

    this.setAbility(new Burn(this));
  }
}
