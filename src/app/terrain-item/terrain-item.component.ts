import { Component, Input } from '@angular/core';
import { CustomGameService } from 'src/model/custom-game.service';
import { Terrain } from 'src/model/terrain';
import { decorate } from '../text-decorator';

@Component({
  selector: 'app-terrain-item',
  templateUrl: './terrain-item.component.html',
  styleUrls: ['./terrain-item.component.scss']
})
export class TerrainItemComponent {

  @Input() terrain!: Terrain;

  constructor(private customGameService: CustomGameService) {}

  select(): void {
    this.customGameService.selectTerrain(this.terrain);
  }

  isSelected(): boolean {
    return this.customGameService.getSelectedTerrain() == this.terrain;
  }

  getCombatPower(): string {
    if (this.terrain.elevation > 0) {
      return decorate(`<buff>${this.terrain.elevation}</buff>`)
    } else if (this.terrain.elevation < 0) {
      return decorate(`<debuff>${this.terrain.elevation}</debuff>`)
    }
    return this.terrain.elevation.toString();
  }

  getNote(): string | null {
    if (this.terrain == Terrain.CHASM) {
      return 'Only flying';
    } else if (this.terrain == Terrain.MARSH) {
      return 'Ends move';
    }
    return null;
  }
}
