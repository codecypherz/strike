import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Game } from "./game";

@Injectable()
export class CustomGameService {

  private game: Game | null = null;

  constructor(@Optional() @SkipSelf() service: CustomGameService) {
    if (service) {
      throw new Error('Singleton violation: CustomGameService');
    }
  }

  startSetup(): void {
    this.game = new Game(new Board());
  }

  hasActiveGame(): boolean {
    return this.game != null;
  }

  getGame(): Game {
    // Throws if game hasn't been set.
    return this.game!;
  }
}