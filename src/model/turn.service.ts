import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Player } from "./player";

/**
 * Provides the data for each player.
 */
@Injectable()
export class TurnService extends EventTarget {

  static START_TURN_EVENT = 'start_turn';

  readonly player1: Player;
  readonly player2: Player;

  constructor(private board: Board, @Optional() @SkipSelf() service?: TurnService) {
    super();

    if (service) {
      throw new Error('Singleton violation: TurnService');
    }

    this.player1 = new Player('player1', 'Player 1', 180);
    this.player2 = new Player('player2', 'Player 2', 0);

    this.reset();
  }

  reset(): void {
    this.player1.reset();
    this.player2.reset();

    this.player1.setActive(true);
  }

  startGame(): void {
    this.reset();
    this.dispatchEvent(new Event(TurnService.START_TURN_EVENT));
  }

  endTurn(): void {
    this.player1.toggleActive();
    this.player2.toggleActive();
    this.dispatchEvent(new Event(TurnService.START_TURN_EVENT));
  }

  getActivePlayer(): Player {
    if (this.player1.isActive()) {
      return this.player1;
    }
    return this.player2;
  }

  getOtherPlayer(player: Player): Player {
    if (this.player1.equals(player)) {
      return this.player2;
    }
    return this.player1;
  }
}
