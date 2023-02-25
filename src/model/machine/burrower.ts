import { Board } from "../board";
import { Player } from "../player";
import { MeleePiece } from "../piece/meleepiece";
import { Piece } from "../piece/piece";

export class Burrower extends MeleePiece {

  static NAME = 'Burrower';
  static IMAGE_URL = Piece.IMAGE_PATH + 'burrower.webp';
  static POINTS = 1;
  static MOVEMENT = 2;
  static ATTACK = 2;
  static ATTACK_RANGE = 1;
  static MAX_HEALTH = 4;

  constructor(board: Board, player: Player) {
    super(
      board,
      Burrower.NAME,
      Burrower.IMAGE_URL,
      Burrower.POINTS,
      Burrower.MOVEMENT,
      Burrower.ATTACK,
      Burrower.ATTACK_RANGE,
      Burrower.MAX_HEALTH,
      player);
  }
}
