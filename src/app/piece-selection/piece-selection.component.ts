import { Component, OnInit } from '@angular/core';
import { CustomGameService, Step } from 'src/model/custom-game.service';
import { SelectService } from 'src/model/select.service';

@Component({
  selector: 'app-piece-selection',
  templateUrl: './piece-selection.component.html',
  styleUrls: ['./piece-selection.component.scss']
})
export class PieceSelectionComponent implements OnInit {

  constructor(
    private customGameService: CustomGameService,
    private selectService: SelectService) {}

  ngOnInit(): void {
    this.customGameService.setStep(Step.PIECE_SELECTION);
    const pieceSet = this.customGameService.getPieceSet();
    if (pieceSet.size() != 0) {
      this.selectService.selectPiece(Array.from(pieceSet.getSet())[0]);
    }
  }
}
