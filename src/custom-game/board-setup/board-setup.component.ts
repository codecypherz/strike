import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/model/game';
import { CustomGameService, Step } from 'src/custom-game/custom-game.service';

@Component({
  selector: 'app-board-setup',
  templateUrl: './board-setup.component.html',
  styleUrls: ['./board-setup.component.scss']
})
export class BoardSetupComponent implements OnInit {

  constructor(private customGameService: CustomGameService) {}

  ngOnInit(): void {
    this.customGameService.setStep(Step.BOARD_SETUP);
  }

  getGame(): Game {
    return this.customGameService.getGame();
  }
}
