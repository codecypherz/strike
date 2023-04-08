import { TestMeleePiece } from "src/test/test-melee-piece";
import { TestRamPiece } from "src/test/test-ram-piece";
import { BaseTest } from "../../test/base-test";
import { Position } from "../position";

describe('Ram Piece', () => {
  let t: BaseTest;

  beforeEach(() => {
    t = new BaseTest();
    t.board.clearTurnData();
  });

  it('ram piece into empty cell', () => {
    const piece11 = new TestRamPiece();
    const piece21 = new TestMeleePiece();
    piece21.rotateClockwise();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);

    t.performAttack(piece11);
  
    // The piece being attacked loses health and gets knocked back.
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 1);
    expect(piece21.getPosition()).toEqual(Position.from(2, 0));

    // The attacking piece moves to where the defender was.
    expect(piece11.getPosition()).toEqual(Position.from(1, 0));
    expect(piece11.getHealth()).toBe(piece11.maxHealth);
  });

  it('ram piece into edge of board', () => {
    const piece11 = new TestRamPiece();
    const piece21 = new TestMeleePiece();
    piece21.rotateClockwise();
    t.initializePiece(piece11, t.player1, 6, 0);
    t.initializePiece(piece21, t.player2, 7, 0);

    t.performAttack(piece11);
  
    // The defender loses health and stays at edge.
    // The defender suffers 1 extra damage due to the edge.
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 2);
    expect(piece21.getPosition()).toEqual(Position.from(7, 0));

    // The attacking piece stays where it was.
    expect(piece11.getPosition()).toEqual(Position.from(6, 0));
    // The attacking piece is not hurt.
    expect(piece11.getHealth()).toBe(piece11.maxHealth);
  });

  it('ram kills piece', () => {
    const piece11 = new TestRamPiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);
    t.setHealth(piece21, 1);

    t.performAttack(piece11);
  
    // The defender dies.
    expect(piece21.isDead()).toBe(true);

    // The attacking piece takes over the defender location.
    expect(piece11.getPosition()).toEqual(Position.from(1, 0));
    // The attacking piece is not hurt.
    expect(piece11.getHealth()).toBe(piece11.maxHealth);
  });
});
