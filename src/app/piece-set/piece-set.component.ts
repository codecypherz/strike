import { Component, Input } from '@angular/core';
import { CustomGameService } from 'src/model/custom-game.service';
import { PieceSet } from 'src/model/piece-set';
import { SelectService } from 'src/model/select.service';

@Component({
  selector: 'app-piece-set',
  templateUrl: './piece-set.component.html',
  styleUrls: ['./piece-set.component.scss']
})
export class PieceSetComponent {

  @Input() pieceSet!: PieceSet;

  constructor(
    private customGameService: CustomGameService,
    private selectService: SelectService) {
  }

  getPieceDescriptors(): Array<string> {
    const pieceMap = new Map<string, number>();
    for (let piece of this.pieceSet.getSet()) {
      const name = piece.name;
      let count = pieceMap.get(name) || 0;
      count++;
      pieceMap.set(name, count);
    }
    const descriptors = new Array<string>();
    for (let name of pieceMap.keys()) {
      const count = pieceMap.get(name);
      descriptors.push(count + ' ' + name);
    }
    return descriptors;
  }

  select(): void {
    this.customGameService.setPieceSet(this.pieceSet);
    if (this.pieceSet.size() != 0) {
      this.selectService.selectPiece(Array.from(this.pieceSet.getSet())[0]);
    }
  }
}
