import { Player } from "../player";
import { Piece } from "./piece";

export class Scrounger extends Piece {

  static NAME = 'Scrounger';
  // Scrapper + Scrounger are the same image?
  static IMAGE_URL = Piece.IMAGE_PATH + 'scrapper.webp';
  static POINTS = 1;
  static MOVEMENT = 3;
  static ATTACK = 3;
  static ATTACK_RANGE = 1;
  static MAX_HEALTH = 5;

  constructor(player: Player) {
    super(
      Scrounger.NAME,
      Scrounger.IMAGE_URL,
      Scrounger.POINTS,
      Scrounger.MOVEMENT,
      Scrounger.ATTACK,
      Scrounger.ATTACK_RANGE,
      Scrounger.MAX_HEALTH,
      player);
  }
}
