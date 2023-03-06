import { TurnService } from "./turn.service";

describe('TurnService', () => {
  let service: TurnService;
  beforeEach(() => { service = new TurnService(undefined); });

  it('#defaultState has player 1 active', () => {
    expect(service.player1.isActive()).toBe(true);
    expect(service.player2.isActive()).toBe(false);
  });

  it('#startGame should begin with player 1', () => {
    service.startGame();
    expect(service.player1.isActive()).toBe(true);
    expect(service.player2.isActive()).toBe(false);
    service.endTurn();
    expect(service.player1.isActive()).toBe(false);
    expect(service.player2.isActive()).toBe(true);
    service.startGame();
    expect(service.player1.isActive()).toBe(true);
    expect(service.player2.isActive()).toBe(false);
  });

  it('#endTurn switches active player', () => {
    service.startGame();
    expect(service.player1.isActive()).toBe(true);
    expect(service.player2.isActive()).toBe(false);
    service.endTurn();
    expect(service.player1.isActive()).toBe(false);
    expect(service.player2.isActive()).toBe(true);
    service.endTurn();
    expect(service.player1.isActive()).toBe(true);
    expect(service.player2.isActive()).toBe(false);
  });

  it('#getActivePlayer returns active player', () => {
    service.startGame();
    expect(service.getActivePlayer()).toBe(service.player1);
    service.endTurn();
    expect(service.getActivePlayer()).toBe(service.player2);
    service.endTurn();
    expect(service.getActivePlayer()).toBe(service.player1);
  });

  it('#getOtherPlayer', () => {
    expect(service.getOtherPlayer(service.player1)).toBe(service.player2);
    expect(service.getOtherPlayer(service.player2)).toBe(service.player1);
  });
});
