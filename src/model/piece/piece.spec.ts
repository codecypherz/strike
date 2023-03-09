import { Board } from "../board";
import { Direction } from "../direction";
import { Scrounger } from "../machine/scrounger";
import { Player } from "../player";
import { Position } from "../position";
import { Piece } from "./piece";

describe('Piece', () => {
  let player1: Player;
  let player2: Player;
  let board: Board;
  let piece11: Piece;
  let piece12: Piece;
  let piece21: Piece;

  beforeEach(() => {
    board = new Board();

    player1 = new Player('player-1', 'Player 1', Direction.DOWN);
    player1.setActive(true);
    piece11 = new Scrounger(board, player1);
    piece12 = new Scrounger(board, player1);

    player2 = new Player('player-2', 'Player 2', Direction.UP);
    piece21 = new Scrounger(board, player2);
    
    initializePiece(piece11, 0, 0);
    initializePiece(piece12, 0, 1);
    initializePiece(piece21, 7, 7);
    board.clearTurnData();

    // Important assumptions for all tests.
    expect(player1.isLastPiece(piece11)).toBe(false);
    expect(player1.isLastPiece(piece12)).toBe(false);
    expect(player2.isLastPiece(piece21)).toBe(true);
  });

  it('#canMove no action taken', () => {
    expect(piece11.canMove()).toBe(true);
  });

  it('#canMove not active player turn', () => {
    expect(piece11.canMove()).toBe(true);
    expect(piece21.canMove()).toBe(false);
  });

  it('#canMove last piece', () => {
    setActive(player2);
    expect(piece21.canMove()).toBe(true);
  });

  it('#canMove last piece 1 move', () => {
    setActive(player2);
    expect(piece21.canMove()).toBe(true);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 6));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();
    // Can move a second time with last piece.
    expect(piece21.canMove()).toBe(true);
  });

  it('#canMove last piece 2 moves', () => {
    setActive(player2);
    expect(piece21.canMove()).toBe(true);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 6));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();
    expect(piece21.canMove()).toBe(true);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 5));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();

    expect(piece21.canMove()).toBe(false);
  });

  it('#canMove last piece 1 move 1 overcharge move', () => {
    setActive(player2);
    expect(piece21.canMove()).toBe(true);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 6));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();

    piece21.select();
    piece21.overcharge();
    piece21.moveOrSprintTo(board.getByRowCol(7, 5));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();

    // Can still do a second, regular move.
    expect(piece21.canMove()).toBe(true);
  });

  it('#canAttack no action taken', () => {
    expect(piece11.canAttack()).toBe(true);
  });

  it('#canAttack not active player turn', () => {
    expect(piece11.canAttack()).toBe(true);
    expect(piece21.canAttack()).toBe(false);
  });

  it('#canAttack with staged sprint', () => {
    movePieceTo(piece11, 0, 0);
    movePieceTo(piece21, 5, 0); // Move just outside of sprint range
    
    expect(piece11.canMove()).toBe(true);
    expect(piece11.canAttack()).toBe(true);
    expect(piece11.hasConfirmableAttack()).toBe(false);
    expect(piece11.stagedSprint).toBe(false);

    piece11.select();
    expect(piece11.hasConfirmableAttack()).toBe(false);

    piece11.moveOrSprintTo(board.getByRowCol(4, 0));
    expect(piece11.stagedSprint).toBe(true);
    expect(piece11.hasConfirmableAttack()).toBe(false);
  });

  it('#canRotate no action taken', () => {
    expect(piece11.canRotate()).toBe(true);
  });

  it('#canRotate not active player turn', () => {
    expect(piece11.canRotate()).toBe(true);
    expect(piece21.canRotate()).toBe(false);
  });

  it('#canRotate before move but after attack', () => {
    movePieceTo(piece11, 0, 0);
    movePieceTo(piece21, 1, 0);
    
    expect(piece11.canMove()).toBe(true);
    expect(piece11.canAttack()).toBe(true);
    expect(piece11.canRotate()).toBe(true);

    piece11.select();
    expect(piece11.hasConfirmableAttack()).toBe(true);

    board.clearStagedAttackData();
    piece11.attack();
    piece11.deselect();

    expect(piece11.canMove()).toBe(true);
    expect(piece11.canAttack()).toBe(false);
    expect(piece11.canRotate()).toBe(false);
  });

  it('#canOvercharge no action taken', () => {
    expect(piece11.canOvercharge()).toBe(false);
  });

  it('#canOvercharge after move', () => {
    movePieceTo(piece11, 0, 0);
    expect(piece11.canOvercharge()).toBe(false);

    piece11.select();
    piece11.moveOrSprintTo(board.getByRowCol(1, 0));
    expect(piece11.hasConfirmableMove()).toBe(true);
    piece11.confirmMove();
    piece11.deselect();

    expect(piece11.canOvercharge()).toBe(true);
  });

  it('#canOvercharge attack but no move', () => {
    movePieceTo(piece11, 0, 0);
    movePieceTo(piece21, 1, 0);
    expect(piece11.canOvercharge()).toBe(false);

    piece11.select();
    expect(piece11.hasConfirmableAttack()).toBe(true);
    board.clearStagedAttackData();
    piece11.attack();
    piece11.deselect();

    expect(piece11.canOvercharge()).toBe(false);
  });

  it('#canOvercharge after move and attack', () => {
    movePieceTo(piece11, 0, 0);
    movePieceTo(piece21, 2, 0);
    expect(piece11.canOvercharge()).toBe(false);

    piece11.select();
    piece11.moveOrSprintTo(board.getByRowCol(1, 0));
    expect(piece11.hasConfirmableMove()).toBe(true);
    piece11.confirmMove();
    piece11.deselect();
    expect(piece11.canOvercharge()).toBe(true);

    piece11.select();
    expect(piece11.hasConfirmableAttack()).toBe(true);
    board.clearStagedAttackData();
    piece11.attack();
    piece11.deselect();
    expect(piece11.canOvercharge()).toBe(true);
  });

  it('#canOvercharge last piece no action taken', () => {
    setActive(player2);
    expect(piece21.canOvercharge()).toBe(false);
  });

  it('#canOvercharge last piece after 1 move', () => {
    setActive(player2);
    movePieceTo(piece21, 7, 1);
    expect(piece21.canOvercharge()).toBe(false);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 0));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();
    expect(piece21.canOvercharge()).toBe(true);
  });

  it('#canOvercharge last piece 1 attack but no move', () => {
    setActive(player2);
    movePieceTo(piece11, 6, 0);
    movePieceTo(piece21, 7, 0);
    expect(piece21.canOvercharge()).toBe(false);

    piece21.select();
    expect(piece21.hasConfirmableAttack()).toBe(true);
    board.clearStagedAttackData();
    piece21.attack();
    piece21.deselect();

    expect(piece21.canOvercharge()).toBe(false);
  });

  it('#canOvercharge last piece after 1 attack and 1 move', () => {
    setActive(player2);
    movePieceTo(piece11, 6, 0);
    movePieceTo(piece21, 7, 1);
    expect(piece21.canOvercharge()).toBe(false);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 0));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();
    expect(piece21.canOvercharge()).toBe(true);

    piece21.select();
    expect(piece21.hasConfirmableAttack()).toBe(true);
    board.clearStagedAttackData();
    piece21.attack();
    piece21.deselect();

    expect(piece21.canOvercharge()).toBe(true);
  });

  it('#canOvercharge last piece after 1 move and 1 overcharge', () => {
    setActive(player2);
    movePieceTo(piece21, 7, 1);
    expect(piece21.canOvercharge()).toBe(false);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 0));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();
    expect(piece21.canOvercharge()).toBe(true);

    piece21.select();
    piece21.overcharge();
    piece21.moveOrSprintTo(board.getByRowCol(7, 1));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();

    // Can't overcharge until another move takes place.
    expect(piece21.canOvercharge()).toBe(false);
  });

  it('#canOvercharge last piece after 1 move and 2 attacks', () => {
    setActive(player2);
    movePieceTo(piece11, 6, 0);
    movePieceTo(piece12, 6, 1);
    movePieceTo(piece21, 7, 1);
    expect(piece21.canOvercharge()).toBe(false);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 0));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();
    expect(piece21.canOvercharge()).toBe(true);

    piece21.select();
    expect(piece21.hasConfirmableAttack()).toBe(true);
    board.clearStagedAttackData();
    piece21.attack();
    piece21.deselect();
    // Can overcharge at this point.
    expect(piece21.canOvercharge()).toBe(true);

    piece21.select();
    piece21.overcharge();
    expect(piece21.hasConfirmableAttack()).toBe(true);
    board.clearStagedAttackData();
    piece21.attack();
    piece21.deselect();
    // Can not overcharge anymore.
    expect(piece21.canOvercharge()).toBe(false);
  });

  it('#canOvercharge last piece after 2 move and 2 attacks and 1 overcharge', () => {
    setActive(player2);
    movePieceTo(piece11, 6, 0);
    movePieceTo(piece12, 6, 1);
    movePieceTo(piece21, 7, 1);
    expect(piece21.canOvercharge()).toBe(false);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 0));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();
    expect(piece21.canOvercharge()).toBe(true);

    piece21.select();
    expect(piece21.hasConfirmableAttack()).toBe(true);
    board.clearStagedAttackData();
    piece21.attack();
    piece21.deselect();
    // Can overcharge at this point.
    expect(piece21.canOvercharge()).toBe(true);

    // Player chooses not to and just moves and attacks again.
    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 1));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();
    expect(piece21.canOvercharge()).toBe(true);

    piece21.select();
    expect(piece21.hasConfirmableAttack()).toBe(true);
    board.clearStagedAttackData();
    piece21.attack();
    piece21.deselect();
    // Can overcharge, but only the once.
    expect(piece21.canOvercharge()).toBe(true);

    // Overcharge and move.
    piece21.select();
    piece21.overcharge();
    piece21.moveOrSprintTo(board.getByRowCol(7, 0));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();
    // No more overcharge to be had.
    expect(piece21.canOvercharge()).toBe(false);
  });

  it('#canOvercharge last piece after 2 moves and 0 attacks', () => {
    setActive(player2);
    movePieceTo(piece11, 6, 0);
    movePieceTo(piece12, 6, 1);
    movePieceTo(piece21, 7, 1);
    expect(piece21.canOvercharge()).toBe(false);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 0));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();
    expect(piece21.canOvercharge()).toBe(true);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 1));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();
    expect(piece21.canOvercharge()).toBe(true);
  });

  it('#canOvercharge last piece after 2 moves and 1 overcharge move at end', () => {
    setActive(player2);
    movePieceTo(piece11, 6, 0);
    movePieceTo(piece12, 6, 1);
    movePieceTo(piece21, 7, 1);
    expect(piece21.canOvercharge()).toBe(false);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 0));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();
    expect(piece21.canOvercharge()).toBe(true);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 1));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();
    expect(piece21.canOvercharge()).toBe(true);

    piece21.select();
    piece21.overcharge();
    piece21.moveOrSprintTo(board.getByRowCol(7, 0));
    expect(piece21.hasConfirmableMove()).toBe(true);
    piece21.confirmMove();
    piece21.deselect();
    // You can't overcharge here because you opted not to overcharge after
    // the first move.
    expect(piece21.canOvercharge()).toBe(false);
  });

  function initializePiece(piece: Piece, row: number, col: number) {
    board.getByRowCol(row, col).setPiece(piece);
    piece.position = new Position(row, col);
    piece.stageAction();
  }

  function movePieceTo(piece: Piece, row: number, col: number) {
    board.getCell(piece.position).clearPiece();
    board.getByRowCol(row, col).setPiece(piece);
    piece.position = new Position(row, col);
  }

  function setActive(player: Player) {
    player1.setActive(false);
    player2.setActive(false);
    player.setActive(true);
  }
});
