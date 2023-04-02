import { Injectable, Optional, SkipSelf } from "@angular/core";
import { Board } from "./board";
import { Cell } from "./cell";
import { Game } from "./game";
import { Terrain } from "./terrain";

@Injectable()
export class CustomGameService {

  private game: Game | null = null;
  private selectedTerrain: Terrain = Terrain.GRASSLAND;

  constructor(@Optional() @SkipSelf() service: CustomGameService) {
    if (service) {
      throw new Error('Singleton violation: CustomGameService');
    }
  }

  startSetup(): void {
    this.game = new Game(new Board());
    this.selectedTerrain = Terrain.GRASSLAND;
  }

  exitSetup(): void {
    this.game = null;
  }

  isSetupActive(): boolean {
    return this.game != null;
  }

  getGame(): Game {
    // Throws if game hasn't been set.
    return this.game!;
  }

  selectTerrain(terrain: Terrain): void {
    this.selectedTerrain = terrain;
  }

  getSelectedTerrain(): Terrain {
    return this.selectedTerrain;
  }

  onCellClicked(cell: Cell): void {
    cell.terrain = this.selectedTerrain;
  }
}