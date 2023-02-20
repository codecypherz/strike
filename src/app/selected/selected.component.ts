import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { BoardService } from 'src/model/board.service';
import { Cell } from 'src/model/cell';
import { Piece } from 'src/model/piece/piece';
import { Terrain } from 'src/model/terrain';

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

  getCombatPower(): string {
    const power = this.getTerrain().elevation;
    if (power > 0) {
      return '+' + power;
    }
    return power.toString();
  }
}
