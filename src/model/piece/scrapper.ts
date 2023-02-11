import { Player } from "../player";
import { Piece } from "./piece";

export class Scrapper extends Piece {

  static NAME = 'Scrapper';
  static POINTS = 2;
  static MOVEMENT = 2;
  static ATTACK = 3;
  static ATTACK_RANGE = 2;
  static MAX_HEALTH = 5;

  constructor(player: Player) {
    super(
      Scrapper.NAME,
      Scrapper.POINTS,
      Scrapper.MOVEMENT,
      Scrapper.ATTACK,
      Scrapper.ATTACK_RANGE,
      Scrapper.MAX_HEALTH,
      player);
  }
}
