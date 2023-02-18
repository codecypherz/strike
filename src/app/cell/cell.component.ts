import { Component, Input } from '@angular/core';
import { BoardService } from 'src/model/board.service';
import { Cell } from 'src/model/cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {

  @Input() cell!: Cell;

  constructor(private boardService: BoardService) { }

  onCellClicked(): void {
    this.boardService.onCellClicked(this.cell);
  }
}
