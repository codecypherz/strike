import { Component, Input } from '@angular/core';
import { BoardService } from 'src/model/board.service';
import { Piece } from 'src/model/piece/piece';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent {

  @Input() piece!: Piece;

  constructor(private boardService: BoardService) {}

  onCancel(event: Event): void {
    // If we don't stop propagation here, the cell click event will fire.
    event.stopPropagation();
    this.boardService.cancelStaging();
  }
}
