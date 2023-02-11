import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { BoardService } from 'src/model/board.service';
import { Cell } from 'src/model/cell';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent implements OnInit {

  selected: Cell | null = null;

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.getSelected();
  }

  getSelected(): Cell | null {
    this.selected = this.boardService.getSelectedCell();
    return this.selected;
  }
}
