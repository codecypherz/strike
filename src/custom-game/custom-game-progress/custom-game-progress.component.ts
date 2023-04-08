import { Component } from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';
import { CustomGameService } from 'src/custom-game/custom-game.service';

@Component({
  selector: 'app-custom-game-progress',
  templateUrl: './custom-game-progress.component.html',
  styleUrls: ['./custom-game-progress.component.scss']
})
export class CustomGameProgressComponent {

  private exactMatch: IsActiveMatchOptions = {
    paths: 'exact',
    queryParams: 'exact',
    fragment: 'ignored',
    matrixParams: 'ignored'
  };

  constructor(
    private router: Router,
    private customGameService: CustomGameService) {}
  
  isBoardSetupActive(): boolean {
    return this.router.isActive('/custom-game/board-setup', this.exactMatch);
  }

  isPieceSelectionActive(): boolean {
    return this.router.isActive('/custom-game/piece-selection', this.exactMatch);
  }

  isPieceSelectionValid(): boolean {
    return this.customGameService.isPieceSelectionValid();
  }

  isPiecePlacementActive(): boolean {
    return this.router.isActive('/custom-game/piece-placement', this.exactMatch);
  }

  isPiecePlacementValid(): boolean {
    return this.customGameService.isPiecePlacementValid();
  }

  isGameValid(): boolean {
    return this.customGameService.isGameValid();
  }

  startGame(): void {
    const started = this.customGameService.startGame();
    if (started) {
      this.router.navigate(['game', this.customGameService.getGame().getId()]);
    }
  }
}
