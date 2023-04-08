import { Component, Input } from '@angular/core';
import { CustomGameService } from 'src/custom-game/custom-game.service';
import { SelectService } from 'src/app/service/select.service';
import { Piece } from 'src/app/model/piece/piece';

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

  canAddPiece(): boolean {
    return this.customGameService.canAddPiece();
  }

  addPiece(): void {
    this.customGameService.addPiece(this.piece);
    this.selectService.selectPiece(this.piece);
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
