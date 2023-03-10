import { Component, OnInit } from '@angular/core';
import { Board } from 'src/model/board';
import { Cell } from 'src/model/cell';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private board: Board) {}

  ngOnInit(): void {
    this.getCells();
  }

  getCells(): Cell[][] {
    return this.board.getCells();
  }
}
