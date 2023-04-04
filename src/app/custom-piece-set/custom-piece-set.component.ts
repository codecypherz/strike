import { Component } from '@angular/core';
import { CustomGameService } from 'src/model/custom-game.service';
import { Piece } from 'src/model/piece/piece';

@Component({
  selector: 'app-custom-piece-set',
  templateUrl: './custom-piece-set.component.html',
  styleUrls: ['./custom-piece-set.component.scss']
})
export class CustomPieceSetComponent {

  constructor(private customGameService: CustomGameService) {}

  getPieces(): Set<Piece> {
    return this.customGameService.getPieceSet().getSet();
  }
}
