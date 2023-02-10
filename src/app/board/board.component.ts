import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/model/board.service';
import { Cell } from 'src/model/cell';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [ BoardService ]
})
export class BoardComponent implements OnInit {

  cells: Cell[][];

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.getCells();
  }

  getCells(): void {
    this.cells = this.boardService.board.getCells();
  }
}
