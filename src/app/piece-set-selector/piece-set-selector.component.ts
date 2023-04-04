import { Component } from '@angular/core';
import { PieceSetCollection } from 'src/model/piece-set-collection';

@Component({
  selector: 'app-piece-set-selector',
  templateUrl: './piece-set-selector.component.html',
  styleUrls: ['./piece-set-selector.component.scss']
})
export class PieceSetSelectorComponent {

  constructor(readonly pieceSetCollection: PieceSetCollection) {}
}
