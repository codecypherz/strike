import { Component } from '@angular/core';
import { Piece } from 'src/app/model/piece/piece';
import { Terrain } from 'src/app/model/terrain';
import { SelectService } from 'src/app/service/select.service';
import { decorate } from 'src/app/util/text-decorator';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent {

  constructor(private selectService: SelectService) {}

  isAnythingSelected(): boolean {
    return this.selectService.isCellSelected() || this.selectService.isPieceSelected();
  }

  getNotSelectedText(): string {
    return this.selectService.getNotSelectedText();
  }
  
  showPieceSelected(): boolean {
    return this.selectService.isPieceSelected();
  }

  showTerrainSelected(): boolean {
    return !this.selectService.isPieceSelected() && this.selectService.isCellSelected();
  }

  getPiece(): Piece {
    return this.selectService.getSelectedPiece()!;
  }
  
  getTerrain(): Terrain {
    return this.selectService.getSelectedCell()!.terrain;
  }

  getPieceTypeDescription(): string {
    return decorate(this.getPiece().getPieceTypeDescription());
  }

  getAbilityDescription(): string {
    return '<b>' + this.getPiece().getAbilityName()
        + ' Ability: </b>'
        + decorate(this.getPiece().getAbilityDescription());
  }

  getTerrainDescription(): string {
    return decorate(this.getTerrain().description);
  }
}
