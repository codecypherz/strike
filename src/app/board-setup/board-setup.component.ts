import { Component } from '@angular/core';
import { CustomGameService } from 'src/model/custom-game.service';
import { Game } from 'src/model/game';

@Component({
  selector: 'app-board-setup',
  templateUrl: './board-setup.component.html',
  styleUrls: ['./board-setup.component.scss']
})
export class BoardSetupComponent {

  constructor(private customGameService: CustomGameService) {}

  getGame(): Game {
    return this.customGameService.getGame();
  }
}
