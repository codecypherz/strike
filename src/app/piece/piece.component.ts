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

  cancel(event: Event): void {
    event.stopPropagation();
    this.boardService.cancelStaging();
  }

  confirmMove(event: Event): void {
    event.stopPropagation();
    this.boardService.confirmMove();
  }

  confirmAttack(event: Event): void {
    event.stopPropagation();
    // TODO: Implement attack.
  }
}
