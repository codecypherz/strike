import { Component } from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';

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

  constructor(private router: Router) {}
  
  isBoardSetupActive(): boolean {
    return this.router.isActive('/custom-game/board-setup', this.exactMatch);
  }

  isPieceSelectionActive(): boolean {
    return this.router.isActive('/custom-game/piece-selection', this.exactMatch);
  }

  isPiecePlacementActive(): boolean {
    return this.router.isActive('/custom-game/piece-placement', this.exactMatch);
  }
}
