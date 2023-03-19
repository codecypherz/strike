import { BaseTest } from "src/test/base-test";
import { TestMeleePiece } from "src/test/test-melee-piece";

describe('Piece Overcharge', () => {
  let t: BaseTest;

  beforeEach(() => {
    t = new BaseTest();
  });

  it('#canOvercharge no action taken', () => {
    const piece11 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);

    expect(piece11.canOvercharge()).toBeFalse();
  });

  it('#canOvercharge after move', () => {
    const piece11 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    expect(piece11.canOvercharge()).toBeFalse();

    t.performMove(piece11, 1, 0);

    expect(piece11.canOvercharge()).toBeTrue();
  });

  it('#canOvercharge attack but no move', () => {
    const piece11 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);
    expect(piece11.canOvercharge()).toBeFalse();

    t.performAttack(piece11);

    expect(piece11.canOvercharge()).toBeFalse();
  });

  it('#canOvercharge after move and attack', () => {
    const piece11 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 2, 0);
    expect(piece11.canOvercharge()).toBeFalse();

    t.performMove(piece11, 1, 0);
    expect(piece11.canOvercharge()).toBeTrue();

    t.performAttack(piece11);
    expect(piece11.canOvercharge()).toBeTrue();
  });

  it('#canOvercharge last piece no action taken', () => {
    const piece11 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    
    expect(piece11.canOvercharge()).toBeFalse();
  });

  it('#canOvercharge last piece after 1 move', () => {
    const piece11 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    expect(piece11.canOvercharge()).toBeFalse();

    t.performMove(piece11, 1, 0);
    expect(piece11.canOvercharge()).toBeTrue();
  });

  it('#canOvercharge last piece 1 attack but no move', () => {
    const piece11 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 6, 0);
    t.initializePiece(piece21, t.player2, 7, 0);
    t.setActivePlayer2();
    expect(piece21.canOvercharge()).toBeFalse();

    t.performAttack(piece21);

    expect(piece21.canOvercharge()).toBeFalse();
  });

  it('#canOvercharge last piece after 1 attack and 1 move', () => {
    const piece11 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 6, 0);
    t.initializePiece(piece21, t.player2, 7, 1);
    t.setActivePlayer2();
    expect(piece21.canOvercharge()).toBeFalse();

    t.performMove(piece21, 7, 0);
    expect(piece21.canOvercharge()).toBeTrue();

    t.performAttack(piece21);
    expect(piece21.canOvercharge()).toBeTrue();
  });

  it('#canOvercharge last piece after 1 move and 1 overcharge', () => {
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece21, t.player2, 7, 1);
    t.setActivePlayer2();
    expect(piece21.canOvercharge()).toBeFalse();

    t.performMove(piece21, 7, 0);
    expect(piece21.canOvercharge()).toBeTrue();

    t.performMoveWithOvercharge(piece21, 7, 1);

    // Can't overcharge until another move takes place.
    expect(piece21.canOvercharge()).toBeFalse();
  });

  it('#canOvercharge last piece after 1 move and 2 attacks', () => {
    const piece11 = new TestMeleePiece();
    const piece12 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 6, 0);
    t.initializePiece(piece12, t.player1, 6, 1);
    t.initializePiece(piece21, t.player2, 7, 1);
    t.setActivePlayer2();
    expect(piece21.canOvercharge()).toBeFalse();

    t.performMove(piece21, 7, 0);
    expect(piece21.canOvercharge()).toBeTrue();

    t.performAttack(piece21);
    // Can overcharge at this point.
    expect(piece21.canOvercharge()).toBeTrue();

    t.performAttackWithOvercharge(piece21);
    // Can not overcharge anymore.
    expect(piece21.canOvercharge()).toBeFalse();
  });

  it('#canOvercharge last piece after 2 move and 2 attacks and 1 overcharge', () => {
    const piece11 = new TestMeleePiece();
    const piece12 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 6, 0);
    t.initializePiece(piece12, t.player1, 6, 1);
    t.initializePiece(piece21, t.player2, 7, 1);
    t.setActivePlayer2();
    expect(piece21.canOvercharge()).toBeFalse();

    t.performMove(piece21, 7, 0);
    expect(piece21.canOvercharge()).toBeTrue();

    t.performAttack(piece21);
    // Can overcharge at this point.
    expect(piece21.canOvercharge()).toBeTrue();

    // Player chooses not to overcharge and just moves and attacks again.
    t.performMove(piece21, 7, 1);
    expect(piece21.canOvercharge()).toBeTrue();

    t.performAttack(piece21);
    // Can overcharge, but only the once.
    expect(piece21.canOvercharge()).toBeTrue();

    // Overcharge and move.
    t.performMoveWithOvercharge(piece21, 7, 0);
    // No more overcharge to be had.
    expect(piece21.canOvercharge()).toBeFalse();
  });

  it('#canOvercharge last piece after 2 moves and 0 attacks', () => {
    const piece11 = new TestMeleePiece();
    const piece12 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 6, 0);
    t.initializePiece(piece12, t.player1, 6, 1);
    t.initializePiece(piece21, t.player2, 7, 1);
    t.setActivePlayer2();
    expect(piece21.canOvercharge()).toBeFalse();

    t.performMove(piece21, 7, 0);
    expect(piece21.canOvercharge()).toBeTrue();

    t.performMove(piece21, 7, 1);
    expect(piece21.canOvercharge()).toBeTrue();
  });

  it('#canOvercharge last piece after 2 moves and 1 overcharge move at end', () => {
    const piece11 = new TestMeleePiece();
    const piece12 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 6, 0);
    t.initializePiece(piece12, t.player1, 6, 1);
    t.initializePiece(piece21, t.player2, 7, 1);
    t.setActivePlayer2();
    expect(piece21.canOvercharge()).toBeFalse();

    t.performMove(piece21, 7, 0);
    expect(piece21.canOvercharge()).toBeTrue();

    t.performMove(piece21, 7, 1);
    expect(piece21.canOvercharge()).toBeTrue();

    t.performMoveWithOvercharge(piece21, 7, 0);
    // You can't overcharge here because you opted not to overcharge after
    // the first move.
    expect(piece21.canOvercharge()).toBeFalse();
  });
});
