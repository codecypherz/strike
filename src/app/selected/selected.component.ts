import { Component, OnInit } from '@angular/core';
import { Cell } from 'src/model/cell';
import { Piece } from 'src/model/piece/piece';
import { SelectService } from 'src/model/select.service';
import { Terrain } from 'src/model/terrain';
import { decorate } from '../text-decorator';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent implements OnInit {

  constructor(private selectService: SelectService) {}

  ngOnInit(): void {
    this.getSelected();
  }

  getSelected(): Cell | null {
    return this.selectService.getSelectedCell();
  }

  getPiece(): Piece {
    return this.getSelected()!.getPiece()!;
  }
  
  getTerrain(): Terrain {
    return this.getSelected()!.terrain;
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
    return decorate(this.getSelected()!.terrain.description);
  }
}
