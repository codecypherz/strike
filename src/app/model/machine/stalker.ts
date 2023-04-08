import { Stalk } from "../ability/stalk";
import { MeleePiece } from "../piece/melee-piece";
import { Piece } from "../piece/piece";

export class Stalker extends MeleePiece {

  static NAME = 'Stalker';
  static IMAGE_URL = Piece.IMAGE_PATH + 'stalker.webp';
  static POINTS = 4;
  static MOVEMENT = 3;
  static ATTACK = 4;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 5;

  constructor() {
    super(
      Stalker.NAME,
      Stalker.IMAGE_URL,
      Stalker.POINTS,
      Stalker.MOVEMENT,
      Stalker.ATTACK,
      Stalker.ATTACK_RANGE,
      Stalker.MAX_HEALTH);

    this.setAbility(new Stalk(this));
  }
}
