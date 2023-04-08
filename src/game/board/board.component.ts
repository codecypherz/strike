import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/model/board';
import { Cell } from 'src/app/model/cell';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() board!: Board;

  ngOnInit(): void {
    this.getCells();
  }

  getCells(): Cell[][] {
    return this.board.getCells();
  }

  isSetupActive(): boolean {
    return this.board.inSetupMode();
  }

  onCellClicked(cell: Cell): void {
    this.board.clickCell(cell);
  }
}
