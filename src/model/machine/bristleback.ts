import { Board } from "../board";
import { Player } from "../player";
import { Piece } from "../piece/piece";
import { RamPiece } from "../piece/rampiece";

export class Bristleback extends RamPiece {

  static NAME = 'Bristleback';
  static IMAGE_URL = Piece.IMAGE_PATH + 'bristleback.webp';
  static POINTS = 2;
  static MOVEMENT = 3;
  static ATTACK = 2;
  static ATTACK_RANGE = 1;
  static MAX_HEALTH = 4;

  constructor(board: Board, player: Player) {
    super(
      board,
      Bristleback.NAME,
      Bristleback.IMAGE_URL,
      Bristleback.POINTS,
      Bristleback.MOVEMENT,
      Bristleback.ATTACK,
      Bristleback.ATTACK_RANGE,
      Bristleback.MAX_HEALTH,
      player);
  }

  override hasAbility(): boolean {
    return true;
  }

  override getAbilityDescription(): string {
    return 'All machines in attack range <debuff>lose 1 HP</debuff>, ' +
        'friend or foe, during the start of every turn.';
  }

  override takeStartOfTurnAction(): void {
    if (this.player.isActive()) {
      for (let cell of this.board.getSurroundingCells(this.getPosition())) {
        if (cell.hasPiece()) {
          const piece = cell.getPiece()!;
          piece.takeDamage_(1);
        }
      }
    }
  }
}
