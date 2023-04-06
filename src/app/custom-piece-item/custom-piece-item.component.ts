import { Component, Input } from '@angular/core';
import { CustomGameService } from 'src/model/custom-game.service';
import { Piece } from 'src/model/piece/piece';
import { SelectService } from 'src/model/select.service';

@Component({
  selector: 'app-custom-piece-item',
  templateUrl: './custom-piece-item.component.html',
  styleUrls: ['./custom-piece-item.component.scss']
})
export class CustomPieceItemComponent {

  @Input() piece!: Piece;

  constructor(
    private customGameService: CustomGameService,
    private selectService: SelectService) {}

  removePiece(): void {
    this.customGameService.removePiece(this.piece);
  }

  isSelected(): boolean {
    if (this.selectService.isPieceSelected()) {
      return this.piece.name == this.selectService.getSelectedPiece()!.name;
    }
    return false;
  }

  select(): void {
    this.selectService.selectPiece(this.piece);
  }
}
