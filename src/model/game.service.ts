import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Player } from "./player";
import { TurnService } from "./turn.service";

/**
 * Provides the main game engine logic.
 */
@Injectable()
export class GameService {

  private winningPlayer: Player | null = null;

  constructor(
    private turnService: TurnService,
    @Optional() @SkipSelf() service?: GameService) {
    if (service) {
      throw new Error('Singleton violation: GameService');
    }
    (window as any).gameService = this;

    this.reset();
  }

  reset(): void {
    this.winningPlayer = null;
  }

  checkWinCondition(): void {
    const p1 = this.hasWinningPoints(this.turnService.player1);
    const p2 = this.hasWinningPoints(this.turnService.player2);
    if (p1 && p2) {
      // Tie break goes to active player.
      this.winningPlayer = this.turnService.getActivePlayer();
    } else if (p1) {
      this.winningPlayer = this.turnService.player1;
    } else if (p2) {
      this.winningPlayer = this.turnService.player2;
    }
  }

  private hasWinningPoints(player: Player): boolean {
    return player.getPoints() >= 7;
  }

  isGameOver(): boolean {
    return this.winningPlayer != null;
  }

  getWinningPlayer(): Player | null {
    return this.winningPlayer;
  }
}
