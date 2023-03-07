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
    
    expect(piece11.canMove()).withContext('canMove').toBe(true);
    expect(piece11.canAttack()).withContext('canAttack').toBe(true);
    expect(piece11.hasConfirmableAttack()).withContext('hasConfirmableAttack').toBe(false);
    expect(piece11.stagedSprint).toBe(false);

    piece11.select();
    expect(piece11.hasConfirmableAttack()).withContext('hasConfirmableAttack').toBe(false);

    piece11.moveOrSprintTo(board.getByRowCol(4, 0));
    expect(piece11.stagedSprint).toBe(true);
    expect(piece11.hasConfirmableAttack()).withContext('hasConfirmableAttack').toBe(false);
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
    
    expect(piece11.canMove()).withContext('canMove').toBe(true);
    expect(piece11.canAttack()).withContext('canAttack').toBe(true);
    expect(piece11.canRotate()).withContext('canRotate').toBe(true);

    piece11.select();
    expect(piece11.hasConfirmableAttack()).toBe(true);

    board.clearStagedAttackData();
    piece11.attack();
    piece11.deselect();

    expect(piece11.canMove()).withContext('canMove').toBe(true);
    expect(piece11.canAttack()).withContext('canAttack').toBe(false);
    expect(piece11.canRotate()).withContext('canRotate').toBe(false);
  });

  it('#canOvercharge no action taken', () => {
    expect(piece11.canOvercharge()).withContext('canOvercharge').toBe(false);
  });

  it('#canOvercharge after move', () => {
    movePieceTo(piece11, 0, 0);
    expect(piece11.canOvercharge()).withContext('canOvercharge').toBe(false);

    piece11.select();
    piece11.moveOrSprintTo(board.getByRowCol(1, 0));
    piece11.confirmMove();

    expect(piece11.canOvercharge()).withContext('canOvercharge').toBe(true);
  });

  it('#canOvercharge attack but no move', () => {
    movePieceTo(piece11, 0, 0);
    movePieceTo(piece21, 1, 0);
    expect(piece11.canOvercharge()).withContext('canOvercharge').toBe(false);

    piece11.select();
    expect(piece11.hasConfirmableAttack()).withContext('hasConfirmableAttack').toBe(true);
    board.clearStagedAttackData();
    piece11.attack();
    piece11.deselect();

    expect(piece11.canOvercharge()).withContext('canOvercharge').toBe(false);
  });

  it('#canOvercharge after move and attack', () => {
    movePieceTo(piece11, 0, 0);
    movePieceTo(piece21, 2, 0);
    expect(piece11.canOvercharge()).withContext('canOvercharge').toBe(false);

    piece11.select();
    piece11.moveOrSprintTo(board.getByRowCol(1, 0));
    piece11.confirmMove();
    piece11.deselect();
    expect(piece11.canOvercharge()).withContext('canOvercharge').toBe(true);

    piece11.select();
    expect(piece11.hasConfirmableAttack()).withContext('hasConfirmableAttack').toBe(true);
    board.clearStagedAttackData();
    piece11.attack();
    piece11.deselect();
    expect(piece11.canOvercharge()).withContext('canOvercharge').toBe(true);
  });

  it('#canOvercharge last piece no action taken', () => {
    setActive(player2);
    expect(piece21.canOvercharge()).withContext('canOvercharge').toBe(false);
  });

  it('#canOvercharge last piece after 1 move', () => {
    setActive(player2);
    movePieceTo(piece21, 7, 1);
    expect(piece21.canOvercharge()).withContext('canOvercharge').toBe(false);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 0));
    piece21.confirmMove();
    piece21.deselect();
    expect(piece21.canOvercharge()).withContext('canOvercharge').toBe(true);
  });

  it('#canOvercharge last piece 1 attack but no move', () => {
    setActive(player2);
    movePieceTo(piece11, 6, 0);
    movePieceTo(piece21, 7, 0);
    expect(piece21.canOvercharge()).withContext('canOvercharge').toBe(false);

    piece21.select();
    expect(piece21.hasConfirmableAttack()).withContext('hasConfirmableAttack').toBe(true);
    board.clearStagedAttackData();
    piece21.attack();
    piece21.deselect();

    expect(piece21.canOvercharge()).withContext('canOvercharge').toBe(false);
  });

  it('#canOvercharge last piece after 1 attack and 1 move', () => {
    setActive(player2);
    movePieceTo(piece11, 6, 0);
    movePieceTo(piece21, 7, 1);
    expect(piece21.canOvercharge()).withContext('canOvercharge').toBe(false);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 0));
    piece21.confirmMove();
    piece21.deselect();
    expect(piece21.canOvercharge()).withContext('canOvercharge').toBe(true);

    piece21.select();
    expect(piece21.hasConfirmableAttack()).withContext('hasConfirmableAttack').toBe(true);
    board.clearStagedAttackData();
    piece21.attack();
    piece21.deselect();

    expect(piece21.canOvercharge()).withContext('canOvercharge').toBe(true);
  });

  it('#canOvercharge last piece after 1 move and 1 overcharge', () => {
    setActive(player2);
    movePieceTo(piece21, 7, 1);
    expect(piece21.canOvercharge()).withContext('canOvercharge').toBe(false);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 0));
    piece21.confirmMove();
    piece21.deselect();
    expect(piece21.canOvercharge()).withContext('canOvercharge').toBe(true);

    piece21.select();
    piece21.overcharge();
    piece21.moveOrSprintTo(board.getByRowCol(7, 1));
    piece21.confirmMove();
    piece21.deselect();

    expect(piece21.canOvercharge()).withContext('canOvercharge').toBe(true);
  });

  it('#canOvercharge last piece after 1 move and 2 attacks', () => {
    setActive(player2);
    movePieceTo(piece11, 6, 0);
    movePieceTo(piece12, 6, 1);
    movePieceTo(piece21, 7, 1);
    expect(piece21.canOvercharge()).withContext('canOvercharge').toBe(false);

    piece21.select();
    piece21.moveOrSprintTo(board.getByRowCol(7, 0));
    piece21.confirmMove();
    piece21.deselect();
    expect(piece21.canOvercharge()).withContext('canOvercharge').toBe(true);

    piece21.select();
    expect(piece21.hasConfirmableAttack()).withContext('hasConfirmableAttack').toBe(true);
    board.clearStagedAttackData();
    piece21.attack();
    piece21.deselect();
    // Can overcharge at this point.
    expect(piece21.canOvercharge()).withContext('canOvercharge').toBe(true);

    piece21.select();
    expect(piece21.hasConfirmableAttack()).withContext('hasConfirmableAttack').toBe(true);
    board.clearStagedAttackData();
    piece21.attack();
    piece21.deselect();
    // Cannot here until after you move a second time.
    // TODO: Fix this bug - the test shows the problem.
    expect(piece21.canOvercharge()).withContext('canOvercharge').toBe(false);
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
