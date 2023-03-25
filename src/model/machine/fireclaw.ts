import { Burn } from "../ability/burn";
import { MeleePiece } from "../piece/melee-piece";
import { Piece } from "../piece/piece";

export class Fireclaw extends MeleePiece {

  static NAME = 'Fireclaw';
  static IMAGE_URL = Piece.IMAGE_PATH + 'fireclaw.webp';
  static POINTS = 7;
  static MOVEMENT = 3;
  static ATTACK = 4;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 10;

  constructor() {
    super(
      Fireclaw.NAME,
      Fireclaw.IMAGE_URL,
      Fireclaw.POINTS,
      Fireclaw.MOVEMENT,
      Fireclaw.ATTACK,
      Fireclaw.ATTACK_RANGE,
      Fireclaw.MAX_HEALTH);
    
    this.setAbility(new Burn(this));
  }
}
