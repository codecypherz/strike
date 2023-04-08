import { Component, Input } from '@angular/core';
import { Terrain } from 'src/app/model/terrain';
import { decorate } from 'src/app/util/text-decorator';
import { CustomGameService } from 'src/custom-game/custom-game.service';

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
