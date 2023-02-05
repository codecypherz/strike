import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/model/board.service';
import { Piece } from 'src/model/piece/piece';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [ BoardService ]
})
export class BoardComponent implements OnInit {
  pieces: Piece[][];

  constructor(private boardService: BoardService) {}

  ngOnInit(): void {
    this.getPieces();
  }

  getPieces(): void {
    this.pieces = this.boardService.getPieces();
  }
}
