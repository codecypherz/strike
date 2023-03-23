import { BaseTest } from "src/test/base-test";
import { TestMeleePiece } from "src/test/test-melee-piece";
import { Piece } from "./piece";

describe('Piece Actions (Normal)', () => {
  let t: BaseTest;

  beforeEach(() => {
    t = new BaseTest();
  });

  it('no action taken', () => {
    const piece11 = new TestMeleePiece();
    const piece12 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 0, 1);
    t.initializePiece(piece21, t.player2, 1, 0);
    t.board.clearTurnData();
    expect(piece11.isLastPiece()).toBeFalse();

    expect(piece11.canOvercharge()).toBeFalse();
    expect(piece11.canMove()).toBeTrue();
    expect(piece11.canAttack()).toBeTrue();
    expect(piece11.canSprint()).toBeTrue();
  });

  it('attack', () => {
    const piece11 = new TestMeleePiece();
    const piece12 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 0, 1);
    t.initializePiece(piece21, t.player2, 1, 0);
    t.board.clearTurnData();
    expect(piece11.isLastPiece()).toBeFalse();

    t.performAttack(piece11);
    expectCanOnlyMove(piece11);
  });

  it('attack, move', () => {
    const piece11 = new TestMeleePiece();
    const piece12 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 0, 3);
    t.initializePiece(piece21, t.player2, 1, 0);
    t.board.clearTurnData();
    expect(piece11.isLastPiece()).toBeFalse();

    t.performAttack(piece11);
    expectCanOnlyMove(piece11);

    t.performMove(piece11, 0, 1);
    expectCanOnlyOvercharge(piece11);
  });

  it('attack, move, overcharge attack', () => {
    const piece11 = new TestMeleePiece();
    const piece12 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    const piece22 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 0, 3);
    t.initializePiece(piece21, t.player2, 1, 0);
    t.initializePiece(piece22, t.player2, 1, 1);
    t.board.clearTurnData();
    expect(piece11.isLastPiece()).toBeFalse();

    t.performAttack(piece11);
    expectCanOnlyMove(piece11);

    t.performMove(piece11, 0, 1);
    expectCanOnlyOvercharge(piece11);

    t.performAttackWithOvercharge(piece11);
    expectCannotTakeActions(piece11);
  });

  it('attack, move, overcharge move', () => {
    const piece11 = new TestMeleePiece();
    const piece12 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    const piece22 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 0, 3);
    t.initializePiece(piece21, t.player2, 1, 0);
    t.initializePiece(piece22, t.player2, 1, 1);
    t.board.clearTurnData();
    expect(piece11.isLastPiece()).toBeFalse();

    t.performAttack(piece11);
    expectCanOnlyMove(piece11);

    t.performMove(piece11, 0, 1);
    expectCanOnlyOvercharge(piece11);

    t.performMoveWithOvercharge(piece11, 0, 2);
    expectCannotTakeActions(piece11);
  });

  it('move', () => {
    const piece11 = new TestMeleePiece();
    const piece12 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 0, 1);
    t.board.clearTurnData();
    expect(piece11.isLastPiece()).toBeFalse();

    t.performMove(piece11, 1, 0);
    expect(piece11.canOvercharge()).toBeTrue();
    expect(piece11.canMove()).toBeFalse();
    expect(piece11.canAttack()).toBeTrue();
    expect(piece11.canSprint()).toBeFalse();
  });

  it('move, overcharged attack', () => {
    const piece11 = new TestMeleePiece();
    const piece12 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 0, 1);
    t.initializePiece(piece21, t.player2, 2, 0);
    t.board.clearTurnData();
    expect(piece11.isLastPiece()).toBeFalse();

    t.performMove(piece11, 1, 0);
    expect(piece11.canOvercharge()).toBeTrue();
    expect(piece11.canMove()).toBeFalse();
    expect(piece11.canAttack()).toBeTrue();
    expect(piece11.canSprint()).toBeFalse();

    t.performAttackWithOvercharge(piece11);
    expectCannotTakeActions(piece11);
  });

  it('move, overcharged move', () => {
    const piece11 = new TestMeleePiece();
    const piece12 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 0, 1);
    t.initializePiece(piece21, t.player2, 2, 0);
    t.board.clearTurnData();
    expect(piece11.isLastPiece()).toBeFalse();

    t.performMove(piece11, 1, 0);
    expect(piece11.canOvercharge()).toBeTrue();
    expect(piece11.canMove()).toBeFalse();
    expect(piece11.canAttack()).toBeTrue();
    expect(piece11.canSprint()).toBeFalse();

    t.performMoveWithOvercharge(piece11, 0, 0);
    expectCannotTakeActions(piece11);
  });

  it('move, attack, overcharged move', () => {
    const piece11 = new TestMeleePiece();
    const piece12 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 0, 1);
    t.initializePiece(piece21, t.player2, 2, 0);
    t.board.clearTurnData();
    expect(piece11.isLastPiece()).toBeFalse();

    t.performMove(piece11, 1, 0);
    expect(piece11.canOvercharge()).toBeTrue();
    expect(piece11.canMove()).toBeFalse();
    expect(piece11.canAttack()).toBeTrue();
    expect(piece11.canSprint()).toBeFalse();

    t.performAttack(piece11);
    expectCanOnlyOvercharge(piece11);

    t.performMoveWithOvercharge(piece11, 1, 1);
    expectCannotTakeActions(piece11);
  });

  it('move, attack, overcharged attack', () => {
    const piece11 = new TestMeleePiece();
    const piece12 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 0, 1);
    t.initializePiece(piece21, t.player2, 2, 0);
    t.board.clearTurnData();
    expect(piece11.isLastPiece()).toBeFalse();

    t.performMove(piece11, 1, 0);
    expect(piece11.canOvercharge()).toBeTrue();
    expect(piece11.canMove()).toBeFalse();
    expect(piece11.canAttack()).toBeTrue();
    expect(piece11.canSprint()).toBeFalse();

    t.performAttack(piece11);
    expectCanOnlyOvercharge(piece11);

    t.performAttackWithOvercharge(piece11);
    expectCannotTakeActions(piece11);
  });

  it('sprint', () => {
    const piece11 = new TestMeleePiece();
    const piece12 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 0, 1);
    t.board.clearTurnData();
    expect(piece11.isLastPiece()).toBeFalse();

    t.performMove(piece11, piece11.moveRange + 1, 0); // Sprint range.
    expectCanOnlyOvercharge(piece11);
  });

  it('sprint, overcharge attack', () => {
    const piece11 = new TestMeleePiece();
    const piece12 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 0, 1);
    t.initializePiece(piece21, t.player2, 5, 0); // Matching sprint range.
    t.board.clearTurnData();
    expect(piece11.isLastPiece()).toBeFalse();

    t.performMove(piece11, piece11.moveRange + 1, 0); // Sprint range.
    expectCanOnlyOvercharge(piece11);

    t.performAttackWithOvercharge(piece11);
    expectCannotTakeActions(piece11);
  });

  it('sprint, overcharge move', () => {
    const piece11 = new TestMeleePiece();
    const piece12 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece12, t.player1, 0, 1);
    t.initializePiece(piece21, t.player2, 5, 0); // Matching sprint range.
    t.board.clearTurnData();
    expect(piece11.isLastPiece()).toBeFalse();

    const sprinted = t.performMove(piece11, piece11.moveRange + 1, 0);
    expect(sprinted).toBeTrue();
    expectCanOnlyOvercharge(piece11);

    t.performMoveWithOvercharge(piece11, 3, 0);
    expectCannotTakeActions(piece11);
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

