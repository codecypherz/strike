import { Component, OnInit } from '@angular/core';
import { Board } from 'src/model/board';
import { BoardService } from 'src/model/board.service';
import { Cell } from 'src/model/cell';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  cells: Cell[][];

  constructor(private board: Board) {}

  ngOnInit(): void {
    this.getCells();
  }

  getCells(): void {
    this.cells = this.board.getCells();
  }
}
