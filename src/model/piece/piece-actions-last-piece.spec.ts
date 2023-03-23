import { BaseTest } from "src/test/base-test";
import { TestMeleePiece } from "src/test/test-melee-piece";
import { Piece } from "./piece";

describe('Piece Actions (Last Piece)', () => {
  let t: BaseTest;
  let piece1: TestMeleePiece;
  let piece21: TestMeleePiece;
  let piece22: TestMeleePiece;
  let piece23: TestMeleePiece;
  let piece24: TestMeleePiece;
  let piece25: TestMeleePiece;
  let piece26: TestMeleePiece;

  /**
   *      0     1     2     3     4     5
   *   |------------------------------------
   * 0 | P1  |     |     |     |     |     |
   *   |------------------------------------
   * 1 | P21 | P22 | P23 | P24 | P25 | P26 |
   *   |------------------------------------
   */
  beforeEach(() => {
    t = new BaseTest();
    piece1 = new TestMeleePiece();
    piece21 = new TestMeleePiece();
    piece22 = new TestMeleePiece();
    piece23 = new TestMeleePiece();
    piece24 = new TestMeleePiece();
    piece25 = new TestMeleePiece();
    piece26 = new TestMeleePiece();
    t.initializePiece(piece1, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);
    t.initializePiece(piece22, t.player2, 1, 1);
    t.initializePiece(piece23, t.player2, 1, 2);
    t.initializePiece(piece24, t.player2, 1, 3);
    t.initializePiece(piece25, t.player2, 1, 4);
    t.initializePiece(piece26, t.player2, 1, 5);
    t.board.clearTurnData();
    expect(piece1.isLastPiece()).toBeTrue();
    expect(piece1.moveRange).toBe(3); // Tests assume this.
  });

  it('no action taken', () => {
    expect(piece1.canOvercharge()).toBeFalse();
    expect(piece1.canMove()).toBeTrue();
    expect(piece1.canAttack()).toBeTrue();
    expect(piece1.canSprint()).toBeTrue();
  });

  it('attack', () => {
    t.performAttack(piece1);
    expectCanOnlyMove(piece1);
  });

  it('attack, move', () => {
    t.performAttack(piece1);
    expectCanOnlyMove(piece1);

    t.performMove(piece1, 0, 1);
    expect(piece1.canOvercharge()).toBeTrue();
    expect(piece1.canMove()).toBeTrue();
    expect(piece1.canAttack()).toBeTrue();
    expect(piece1.canSprint()).toBeTrue();
  });

  it('attack, move, overcharge move', () => {
    t.performAttack(piece1);
    expectCanOnlyMove(piece1);

    t.performMove(piece1, 0, 1);
    expect(piece1.canOvercharge()).toBeTrue();
    expect(piece1.canMove()).toBeTrue();
    expect(piece1.canAttack()).toBeTrue();
    expect(piece1.canSprint()).toBeTrue();

    t.performMoveWithOvercharge(piece1, 0, 0);
    expect(piece1.canOvercharge()).toBeFalse();
    expect(piece1.canMove()).toBeTrue();
    expect(piece1.canAttack()).toBeTrue();
    expect(piece1.canSprint()).toBeTrue();
  });

  it('attack, move, overcharge move', () => {
    t.performAttack(piece1);
    expectCanOnlyMove(piece1);

    t.performMove(piece1, 0, 1);
    expect(piece1.canOvercharge()).toBeTrue();
    expect(piece1.canMove()).toBeTrue();
    expect(piece1.canAttack()).toBeTrue();
    expect(piece1.canSprint()).toBeTrue();

    t.performAttackWithOvercharge(piece1);
    expect(piece1.canOvercharge()).toBeFalse();
    expect(piece1.canMove()).toBeTrue();
    expect(piece1.canAttack()).toBeTrue();
    expect(piece1.canSprint()).toBeTrue();
  });

  it('attack, move, sprint', () => {
    t.performAttack(piece1);
    expectCanOnlyMove(piece1);

    t.performMove(piece1, 0, 1);
    expect(piece1.canOvercharge()).toBeTrue();
    expect(piece1.canMove()).toBeTrue();
    expect(piece1.canAttack()).toBeTrue();
    expect(piece1.canSprint()).toBeTrue();

    t.performMove(piece1, 0, 5); // Sprint
    expectCanOnlyOvercharge(piece1);
  });

  it('attack, move, sprint, overcharge move', () => {
    t.performAttack(piece1);
    expectCanOnlyMove(piece1);

    t.performMove(piece1, 0, 1);
    expect(piece1.canOvercharge()).toBeTrue();
    expect(piece1.canMove()).toBeTrue();
    expect(piece1.canAttack()).toBeTrue();
    expect(piece1.canSprint()).toBeTrue();

    const sprinted = t.performMove(piece1, 0, 5);
    expect(sprinted).toBe(true);
    expectCanOnlyOvercharge(piece1);

    t.performMoveWithOvercharge(piece1, 0, 2);
    expectCannotTakeActions(piece1);
  });

  it('attack, move, sprint, overcharge attack', () => {
    t.performAttack(piece1);
    expectCanOnlyMove(piece1);

    t.performMove(piece1, 0, 1);
    expect(piece1.canOvercharge()).toBeTrue();
    expect(piece1.canMove()).toBeTrue();
    expect(piece1.canAttack()).toBeTrue();
    expect(piece1.canSprint()).toBeTrue();

    t.performMove(piece1, 0, 5); // Sprint
    expectCanOnlyOvercharge(piece1);

    t.performAttackWithOvercharge(piece1);
    expectCannotTakeActions(piece1);
  });

  it('attack, move, attack', () => {
    t.performAttack(piece1);
    expectCanOnlyMove(piece1);

    t.performMove(piece1, 0, 1);
    expect(piece1.canOvercharge()).toBeTrue();
    expect(piece1.canMove()).toBeTrue();
    expect(piece1.canAttack()).toBeTrue();
    expect(piece1.canSprint()).toBeTrue();

    t.performAttack(piece1);
    expectCanOnlyMove(piece1);
  });

  it('attack, move, attack, move', () => {
    t.performAttack(piece1);
    expectCanOnlyMove(piece1);

    t.performMove(piece1, 0, 1);
    expect(piece1.canOvercharge()).toBeTrue();
    expect(piece1.canMove()).toBeTrue();
    expect(piece1.canAttack()).toBeTrue();
    expect(piece1.canSprint()).toBeTrue();

    t.performAttack(piece1);
    expectCanOnlyMove(piece1);

    t.performMove(piece1, 0, 0);
    expectCanOnlyOvercharge(piece1);
  });

  it('attack, move, attack, move, overcharge move', () => {
    t.performAttack(piece1);
    expectCanOnlyMove(piece1);

    t.performMove(piece1, 0, 1);
    expect(piece1.canOvercharge()).toBeTrue();
    expect(piece1.canMove()).toBeTrue();
    expect(piece1.canAttack()).toBeTrue();
    expect(piece1.canSprint()).toBeTrue();

    t.performAttack(piece1);
    expectCanOnlyMove(piece1);

    t.performMove(piece1, 0, 0);
    expectCanOnlyOvercharge(piece1);

    t.performMoveWithOvercharge(piece1, 0, 1);
    expectCannotTakeActions(piece1);
  });

  it('attack, move, attack, move, overcharge attack', () => {
    t.performAttack(piece1);
    expectCanOnlyMove(piece1);

    t.performMove(piece1, 0, 1);
    expect(piece1.canOvercharge()).toBeTrue();
    expect(piece1.canMove()).toBeTrue();
    expect(piece1.canAttack()).toBeTrue();
    expect(piece1.canSprint()).toBeTrue();

    t.performAttack(piece1);
    expectCanOnlyMove(piece1);

    t.performMove(piece1, 0, 0);
    expectCanOnlyOvercharge(piece1);

    t.performAttackWithOvercharge(piece1);
    expectCannotTakeActions(piece1);
  });

  it('sprint', () => {
    t.performMove(piece1, 0, 4);
    expect(piece1.canOvercharge()).toBeTrue();
    expect(piece1.canMove()).toBeTrue();
    expect(piece1.canAttack()).toBeTrue();
    expect(piece1.canSprint()).toBeTrue();
  });

  it('move', () => {
    t.performMove(piece1, 0, 1);
    expect(piece1.canOvercharge()).toBeTrue();
    expect(piece1.canMove()).toBeTrue();
    expect(piece1.canAttack()).toBeTrue();
    expect(piece1.canSprint()).toBeTrue();
  });

  function expectCanOnlyOvercharge(piece: Piece) {
    expect(piece.canOvercharge()).withContext('canOvercharge').toBeTrue();
    expect(piece.canMove()).withContext('canMove').toBeFalse();
    expect(piece.canAttack()).withContext('canAttack').toBeFalse();
    expect(piece.canSprint()).withContext('canSprint').toBeFalse();
  }

  function expectCanOnlyMove(piece: Piece) {
    expect(piece.canOvercharge()).withContext('canOvercharge').toBeFalse();
    expect(piece.canMove()).withContext('canMove').toBeTrue();
    expect(piece.canAttack()).withContext('canAttack').toBeFalse();
    expect(piece.canSprint()).withContext('canSprint').toBeFalse();
  }

  function expectCannotTakeActions(piece: Piece) {
    expect(piece.canOvercharge()).withContext('canOvercharge').toBeFalse();
    expect(piece.canMove()).withContext('canMove').toBeFalse();
    expect(piece.canAttack()).withContext('canAttack').toBeFalse();
    expect(piece.canSprint()).withContext('canSprint').toBeFalse();
  }
});
