import { BaseTest } from "src/app/test/base-test";
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
    t.initializePiece(piece11, t.player1, 0, 0);
    t.setActivePlayer2();
    expect(piece11.canRotate()).toBeFalse();
  });
});
