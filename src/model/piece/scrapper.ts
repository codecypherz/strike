import { Player } from "../player";
import { GunnerPiece } from "./gunnerpiece";
import { Piece } from "./piece";

export class Scrapper extends GunnerPiece {

  static NAME = 'Scrapper';
  static IMAGE_URL = Piece.IMAGE_PATH + 'scrapper.webp';
  static POINTS = 2;
  static MOVEMENT = 2;
  static ATTACK = 3;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 4;

  constructor(player: Player) {
    super(
      Scrapper.NAME,
      Scrapper.IMAGE_URL,
      Scrapper.POINTS,
      Scrapper.MOVEMENT,
      Scrapper.ATTACK,
      Scrapper.ATTACK_RANGE,
      Scrapper.MAX_HEALTH,
      player);
  }
}
