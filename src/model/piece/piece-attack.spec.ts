import { TestMeleePiece } from "src/test/test-melee-piece";
import { BaseTest } from "../../test/base-test";

describe('Piece Attack', () => {
  let t: BaseTest;

  beforeEach(() => {
    t = new BaseTest();
  });

  it('canAttack no action taken', () => {
    const piece11 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    expect(piece11.canAttack()).toBe(true);
  });

  it('canAttack not active player turn', () => {
    const piece11 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 7, 0);
    expect(piece11.canAttack()).toBe(true);
    expect(piece21.canAttack()).toBe(false);
  });

  it('canAttack with staged sprint', () => {
    const piece11 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 5, 0); // Move just outside of sprint range
    
    expect(piece11.canMove()).toBe(true);
    expect(piece11.canAttack()).toBe(true);
    expect(piece11.hasConfirmableAttack()).toBe(false);
    expect(piece11.stagedSprint).toBe(false);

    piece11.select();
    expect(piece11.hasConfirmableAttack()).toBe(false);

    piece11.moveOrSprintTo(t.board.getByRowCol(4, 0));
    expect(piece11.stagedSprint).toBe(true);
    expect(piece11.hasConfirmableAttack()).toBe(false);
  });

  it('canAttack last piece 0 attacks', () => {
    const piece11 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);
    t.setActivePlayer2();
    expect(piece21.canAttack()).toBe(true);
  });

  it('canAttack last piece 1 attack', () => {
    const piece11 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);
    t.setActivePlayer2();
    expect(piece21.canAttack()).toBe(true);

    t.performAttack(piece21);
    expect(piece21.canAttack()).toBe(false);
  });
});
