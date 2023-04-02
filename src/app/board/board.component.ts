import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/model/board';
import { Cell } from 'src/model/cell';
import { CustomGameService } from 'src/model/custom-game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() board!: Board;

  constructor(private customGameService: CustomGameService) { }

  ngOnInit(): void {
    this.getCells();
  }

  getCells(): Cell[][] {
    return this.board.getCells();
  }

  isSetupActive(): boolean {
    return this.customGameService.isSetupActive();
  }
}
