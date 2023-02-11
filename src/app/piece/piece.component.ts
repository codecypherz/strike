import { Component, Input } from '@angular/core';
import { Piece } from 'src/model/piece/piece';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.scss']
})
export class PieceComponent {

  @Input() piece!: Piece;
}
