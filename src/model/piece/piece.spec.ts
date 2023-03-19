import { BaseTest } from "src/test/base-test";
import { TestMeleePiece } from "src/test/test-melee-piece";
import { Board } from "../board";
import { Direction } from "../direction";
import { Scrounger } from "../machine/scrounger";
import { Player } from "../player";
import { Position } from "../position";
import { Piece } from "./piece";

describe('Piece', () => {
  let t: BaseTest;

  beforeEach(() => {
    t = new BaseTest();
  });

  it('#canRotate no action taken', () => {
    const piece11 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    expect(piece11.canRotate()).toBeTrue();
  });

  it('#canRotate not active player turn', () => {
    const piece11 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 7, 0);
    expect(piece11.canRotate()).toBeTrue();
    expect(piece21.canRotate()).toBeFalse();
  });

  it('#canRotate before move but after attack', () => {
    const piece11 = new TestMeleePiece();
    const piece21 = new TestMeleePiece();
    t.initializePiece(piece11, t.player1, 0, 0);
    t.initializePiece(piece21, t.player2, 1, 0);
    
    expect(piece11.canMove()).toBeTrue();
    expect(piece11.canAttack()).toBeTrue();
    expect(piece11.canRotate()).toBeTrue();

    t.performAttack(piece11);

    expect(piece11.canMove()).toBeTrue();
    expect(piece11.canAttack()).toBeFalse();
    expect(piece11.canRotate()).toBeFalse();
  });
});
