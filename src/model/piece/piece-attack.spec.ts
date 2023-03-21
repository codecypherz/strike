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
    expect(piece11.canAttack()).toBeTrue();
  });

  it('canAttack not active player turn', () => {
    const piece11 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 7, 0);
    expect(piece11.canAttack()).toBeTrue();
    expect(piece21.canAttack()).toBeFalse();
  });

  it('canAttack with staged sprint', () => {
    const piece11 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 5, 0); // Move just outside of sprint range
    
    expect(piece11.canMove()).toBeTrue();
    expect(piece11.canAttack()).toBeTrue();
    expect(piece11.hasConfirmableAttack()).toBeFalse();
    expect(piece11.stagedSprint).toBeFalse();

    piece11.select();
    expect(piece11.hasConfirmableAttack()).toBeFalse();

    piece11.moveOrSprintTo(t.board.getByRowCol(4, 0));
    expect(piece11.stagedSprint).toBeTrue();
    expect(piece11.hasConfirmableAttack()).toBeFalse();
  });

  it('canAttack last piece 0 attacks', () => {
    const piece11 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);
    t.setActivePlayer2();
    expect(piece21.canAttack()).toBeTrue();
  });

  it('canAttack last piece 1 attack', () => {
    const piece11 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);
    t.setActivePlayer2();
    expect(piece21.canAttack()).toBeTrue();

    t.performAttack(piece21);
    expect(piece21.canAttack()).toBeFalse();
  });
});
