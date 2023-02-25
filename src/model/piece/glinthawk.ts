import { Board } from "../board";
import { Player } from "../player";
import { Direction } from "./direction";
import { Piece } from "./piece";
import { Strength } from "./strength";
import { SwoopPiece } from "./swooppiece";

export class Glinthawk extends SwoopPiece {

  static NAME = 'Glinthawk';
  static IMAGE_URL = Piece.IMAGE_PATH + 'glinthawk.webp';
  static POINTS = 2;
  static MOVEMENT = 3;
  static ATTACK = 2;
  static ATTACK_RANGE = 3;
  static MAX_HEALTH = 5;

  constructor(board: Board, player: Player) {
    super(
      board,
      Glinthawk.NAME,
      Glinthawk.IMAGE_URL,
      Glinthawk.POINTS,
      Glinthawk.MOVEMENT,
      Glinthawk.ATTACK,
      Glinthawk.ATTACK_RANGE,
      Glinthawk.MAX_HEALTH,
      player);

    this.sideStrengths = new Map<number, Strength>([
      [Direction.UP.degrees, Strength.WEAK],
      [Direction.RIGHT.degrees, Strength.NEUTRAL],
      [Direction.LEFT.degrees, Strength.NEUTRAL],
      [Direction.DOWN.degrees, Strength.STRONG]
    ]);
  }
}
