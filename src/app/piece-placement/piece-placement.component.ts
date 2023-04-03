import { Component, OnInit } from '@angular/core';
import { CustomGameService, Step } from 'src/model/custom-game.service';
import { Game } from 'src/model/game';

@Component({
  selector: 'app-piece-placement',
  templateUrl: './piece-placement.component.html',
  styleUrls: ['./piece-placement.component.scss']
})
export class PiecePlacementComponent implements OnInit {

  constructor(private customGameService: CustomGameService) {}

  ngOnInit(): void {
    this.customGameService.setStep(Step.PIECE_PLACEMENT);
  }

  getGame(): Game {
    return this.customGameService.getGame();
  }
}
