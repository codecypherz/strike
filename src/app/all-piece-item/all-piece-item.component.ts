import { Component, Input } from '@angular/core';
import { CustomGameService } from 'src/model/custom-game.service';
import { Piece } from 'src/model/piece/piece';
import { SelectService } from 'src/model/select.service';

@Component({
  selector: 'app-all-piece-item',
  templateUrl: './all-piece-item.component.html',
  styleUrls: ['./all-piece-item.component.scss']
})
export class AllPieceItemComponent {

  @Input() piece!: Piece;

  constructor(
    private customGameService: CustomGameService,
    private selectService: SelectService) {}

  addPiece(): void {
    this.customGameService.getPieceSet().add(this.piece);
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