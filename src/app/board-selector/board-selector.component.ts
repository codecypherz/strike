import { Component } from '@angular/core';
import { BoardCollection } from 'src/model/board-collection';

@Component({
  selector: 'app-board-selector',
  templateUrl: './board-selector.component.html',
  styleUrls: ['./board-selector.component.scss']
})
export class BoardSelectorComponent {

  constructor(public boardCollection: BoardCollection) { }
}
