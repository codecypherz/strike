import { Component } from '@angular/core';
import { PieceCollection } from 'src/model/piece-collection';

@Component({
  selector: 'app-all-piece-collection',
  templateUrl: './all-piece-collection.component.html',
  styleUrls: ['./all-piece-collection.component.scss']
})
export class AllPieceCollectionComponent {

  constructor(readonly pieceCollection: PieceCollection) {}

  getAllPieces() {
    return this.pieceCollection.createAllPieces().getSet();
  }
}
