import { BaseTest } from "../../test/basetest";
import { Scrounger } from "../machine/scrounger";
import { Position } from "../position";
import { RamPiece } from "./rampiece";

describe('Ram Piece', () => {
  let t: BaseTest;

  beforeEach(() => {
    t = new BaseTest();
    t.player1.setActive(true);
    t.board.clearTurnData();
  });

  it('ram piece into empty cell', () => {
    let piece11 = new TestRamPiece();
    let piece21 = new Scrounger();
    piece21.rotateClockwise();
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece21, 1, 0);

    t.performAttack(piece11);
  
    // The piece being attacked loses health and gets knocked back.
    expect(piece21.getHealth()).toBe(piece21.maxHealth - 1);
    expect(piece21.getPosition()).toEqual(Position.from(2, 0));

    // The attacking piece moves to where the defender was.
    expect(piece11.getPosition()).toEqual(Position.from(1, 0));
  });

  it('ram piece into edge of board', () => {
    let piece11 = new TestRamPiece();
    let piece21 = new Scrounger();
    piece21.rotateClockwise();
    t.initializePiece(piece11, 6, 0);
    t.initializePiece(piece21, 7, 0);

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
    let piece11 = new TestRamPiece();
    let piece21 = new Scrounger();
    piece21.rotateClockwise();
    t.initializePiece(piece11, 0, 0);
    t.initializePiece(piece21, 1, 0);
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

class TestRamPiece extends RamPiece {
  constructor() {
    super(
      'Test Ram Piece',
      'image url',
      2,  // points
      3,  // movement
      1,  // attack
      3,  // attack range
      5,); // health
    }
}
