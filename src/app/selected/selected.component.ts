import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { BoardService } from 'src/model/board.service';
import { Cell } from 'src/model/cell';
import { Piece } from 'src/model/piece/piece';
import { Terrain } from 'src/model/terrain';
import { decorate } from '../textdecorator';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent implements OnInit {

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.getSelected();
  }

  getSelected(): Cell | null {
    return this.boardService.getSelectedCell();
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
    return '<b>Ability: </b>' + decorate(this.getPiece().getAbilityDescription());
  }

  getTerrainDescription(): string {
    return decorate(this.getSelected()!.terrain.description);
  }
}
