import { Gallop } from "../ability/gallop";
import { Stalk } from "../ability/stalk";
import { DashPiece } from "../piece/dash-piece";
import { MeleePiece } from "../piece/melee-piece";
import { Piece } from "../piece/piece";

export class Clamberjaw extends MeleePiece {

  static NAME = 'Clamberjaw';
  static IMAGE_URL = Piece.IMAGE_PATH + 'clamberjaw.webp';
  static POINTS = 4;
  static MOVEMENT = 3;
  static ATTACK = 3;
  static ATTACK_RANGE = 1;
  static MAX_HEALTH = 8;

  constructor() {
    super(
      Clamberjaw.NAME,
      Clamberjaw.IMAGE_URL,
      Clamberjaw.POINTS,
      Clamberjaw.MOVEMENT,
      Clamberjaw.ATTACK,
      Clamberjaw.ATTACK_RANGE,
      Clamberjaw.MAX_HEALTH);
    
    this.setAbility(new Stalk(this));
  }
}
