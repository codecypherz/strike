import { Component, Input } from '@angular/core';
import { CustomGameService } from 'src/model/custom-game.service';
import { Piece } from 'src/model/piece/piece';

@Component({
  selector: 'app-custom-piece-item',
  templateUrl: './custom-piece-item.component.html',
  styleUrls: ['./custom-piece-item.component.scss']
})
export class CustomPieceItemComponent {

  @Input() piece!: Piece;

  constructor(private customGameService: CustomGameService) {}

  removePiece(): void {
    this.customGameService.getPieceSet().remove(this.piece);
  }
}
