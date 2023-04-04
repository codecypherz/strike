import { Component, Input } from '@angular/core';
import { CustomGameService } from 'src/model/custom-game.service';
import { Piece } from 'src/model/piece/piece';

@Component({
  selector: 'app-all-piece-item',
  templateUrl: './all-piece-item.component.html',
  styleUrls: ['./all-piece-item.component.scss']
})
export class AllPieceItemComponent {

  @Input() piece!: Piece;

  constructor(private customGameService: CustomGameService) {}

  addPiece(): void {
    this.customGameService.getPieceSet().add(this.piece);
  }
}
