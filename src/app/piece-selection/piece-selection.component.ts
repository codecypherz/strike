import { Component, OnInit } from '@angular/core';
import { CustomGameService, Step } from 'src/model/custom-game.service';

@Component({
  selector: 'app-piece-selection',
  templateUrl: './piece-selection.component.html',
  styleUrls: ['./piece-selection.component.scss']
})
export class PieceSelectionComponent implements OnInit {

  constructor(private customGameService: CustomGameService) {}

  ngOnInit(): void {
    this.customGameService.setStep(Step.PIECE_SELECTION);
  }
}
