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

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.getSelected();
  }

  getSelected(): Cell | null {
    return this.boardService.getSelectedCell();
  }
}
