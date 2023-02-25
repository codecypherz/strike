import { Board } from "../board";
import { Player } from "../player";
import { MeleePiece } from "./meleepiece";
import { Piece } from "./piece";

export class Scrounger extends MeleePiece {

  static NAME = 'Scrounger';
  // Scrapper + Scrounger are the same image?
  static IMAGE_URL = Piece.IMAGE_PATH + 'scrapper.webp';
  static POINTS = 1;
  static MOVEMENT = 3;
  static ATTACK = 2;
  static ATTACK_RANGE = 1;
  static MAX_HEALTH = 5;

  constructor(board: Board, player: Player) {
    super(
      board,
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
