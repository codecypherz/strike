import { BaseTest } from "src/test/base-test";
import { TestMeleePiece } from "src/test/test-melee-piece";
import { Actions } from "./actions";

const OVERCHARGE = true;
const NO_OVERCHARGE = false;

describe('Actions', () => {
  let actions: Actions;
  beforeEach(() => {
    actions = new Actions();
  });

  it('getNumMovesOrSprintsWithoutOvercharge: 0 actions', () => {
    expect(actions.getNumMovesOrSprintsWithoutOvercharge()).toBe(0);
  });

  it('getNumMovesOrSprintsWithoutOvercharge: 1 move', () => {
    actions.addMove(NO_OVERCHARGE);
    expect(actions.getNumMovesOrSprintsWithoutOvercharge()).toBe(1);
  });

  it('getActionsSinceResetPoint: 0 actions', () => {
    const filtered = actions.getActionsSinceResetPoint();
    expect(filtered.getActions()).toHaveSize(0);
  });

  it('getActionsSinceResetPoint: 1 move', () => {
    actions.addMove(NO_OVERCHARGE);
    const filtered = actions.getActionsSinceResetPoint();
    expect(filtered.getActions()).toHaveSize(1);
  });

  it('getActionsSinceResetPoint: 1 move, 1 attack', () => {
    actions.addMove(NO_OVERCHARGE);
    actions.addAttack(NO_OVERCHARGE);
    const filtered = actions.getActionsSinceResetPoint();
    expect(filtered.getActions()).toHaveSize(2);
  });

  it('getActionsSinceResetPoint: 1 sprint', () => {
    actions.addSprint();
    const filtered = actions.getActionsSinceResetPoint();
    expect(filtered.getActions()).toHaveSize(1);
  });

  it('getActionsSinceResetPoint: 1 sprint, 1 overcharge attack', () => {
    actions.addSprint();
    actions.addAttack(OVERCHARGE);
    const filtered = actions.getActionsSinceResetPoint();
    expect(filtered.getActions()).toHaveSize(0);
  });

  it('getActionsSinceResetPoint: 1 attack', () => {
    actions.addAttack(NO_OVERCHARGE);
    const filtered = actions.getActionsSinceResetPoint();
    expect(filtered.getActions()).toHaveSize(1);
  });

  it('getActionsSinceResetPoint: 1 attack, 1 move', () => {
    actions.addAttack(NO_OVERCHARGE);
    actions.addMove(NO_OVERCHARGE);
    const filtered = actions.getActionsSinceResetPoint();
    expect(filtered.getActions()).toHaveSize(2);
  });
});
