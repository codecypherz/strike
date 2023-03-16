import { BaseTest } from "../../test/basetest";
import { Board } from "../board";
import { Scrounger } from "../machine/scrounger";
import { Player } from "../player";
import { Position } from "../position";
import { SwoopPiece } from "./swooppiece";

describe('Swoop Piece', () => {
  let t: BaseTest;

  beforeEach(() => {
    t = new BaseTest();
    t.player1.setActive(true);
    t.board.clearTurnData();
  });

  it('basic attack', () => {
    let piece11 = new TestSwoopPiece(t.board, t.player1);
    let piece21 = new Scrounger(t.board, t.player2);
    piece21.rotateClockwise();
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece21, 3, 0);

    t.performAttack(piece11);
  
    // The piece being attacked loses health.
    // 1 health for attack power
    // 1 health for the +1 terrain bonus
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 2);
    expect(piece21.getPosition()).toEqual(Position.from(3, 0));

    // The attacking piece moves next to piece being attacked.
    expect(piece11.getPosition()).toEqual(Position.from(2, 0));
  });
});

class TestSwoopPiece extends SwoopPiece {
  constructor(board: Board, player: Player) {
    super(
      board,
      'Test Swoop Piece',
      'image url',
      2, // points
      3, // movement
      1, // attack
      3, // attack range
      5, // health
      player);
    }
}
