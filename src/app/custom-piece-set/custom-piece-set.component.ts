import { Component } from '@angular/core';
import { CustomGameService } from 'src/model/custom-game.service';
import { Piece } from 'src/model/piece/piece';
import { decorate } from '../text-decorator';

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
    if (points > 10 || points < 7) {
      return decorate(`<debuff>${points}</debuff>`);
    } else {
      return points.toString();
    }
  }
}
