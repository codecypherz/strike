import { Component } from '@angular/core';
import { Piece } from 'src/app/model/piece/piece';
import { decorate } from 'src/app/util/text-decorator';
import { CustomGameService } from 'src/custom-game/custom-game.service';

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

  getPoints(): string {
    const points = this.customGameService.getPieceSet().getPoints();
    if (!this.customGameService.isPieceSelectionValid()) {
      return decorate(`<debuff>${points}</debuff>`);
    } else {
      return points.toString();
    }
  }
}
