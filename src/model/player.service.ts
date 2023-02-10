import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Player } from "./player";

/**
 * Provides the data for each player.
 */
@Injectable()
export class PlayerService {

  readonly player1: Player;
  readonly player2: Player;

  constructor(@Optional() @SkipSelf() service?: PlayerService) {
    if (service) {
      throw new Error('Singleton violation: PlayerService');
    }

    this.player1 = new Player('player1', 'Player 1');
    this.player2 = new Player('player2', 'Player 2');

    this.player1.setActive(true);
  }

  endTurn(): void {
    this.player1.toggleActive();
    this.player2.toggleActive();
  }

  getActivePlayer(): Player {
    if (this.player1.isActive()) {
      return this.player1;
    }
    return this.player2;
  }
}
