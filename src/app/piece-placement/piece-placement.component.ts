import { Component, OnInit } from '@angular/core';
import { CustomGameService, Step } from 'src/model/custom-game.service';
import { Game } from 'src/model/game';
import { Piece } from 'src/model/piece/piece';
import { SelectService } from 'src/model/select.service';

@Component({
  selector: 'app-piece-placement',
  templateUrl: './piece-placement.component.html',
  styleUrls: ['./piece-placement.component.scss']
})
export class PiecePlacementComponent implements OnInit {

  constructor(
    private customGameService: CustomGameService,
    private selectService: SelectService) {
  }

  ngOnInit(): void {
    this.customGameService.setStep(Step.PIECE_PLACEMENT);
  }

  getGame(): Game {
    return this.customGameService.getGame();
  }

  getPieces(): Set<Piece> {
    return this.customGameService.getPieceSet().getSet();
  }

  select(piece: Piece): void {
    this.selectService.selectPiece(piece);
    this.customGameService.showAvailablePlacement();
  }

  isSelected(piece: Piece): boolean {
    return this.selectService.isPieceSelected()
        && this.selectService.getSelectedPiece()! == piece;
  }

  hasBeenPlaced(piece: Piece): boolean {
    return this.customGameService.hasBeenPlaced(piece);
  }
}
