import { Component } from '@angular/core';
import { Terrain } from 'src/app/model/terrain';

@Component({
  selector: 'app-terrain-selector',
  templateUrl: './terrain-selector.component.html',
  styleUrls: ['./terrain-selector.component.scss']
})
export class TerrainSelectorComponent {

  mountain = Terrain.MOUNTAIN;
  hill = Terrain.HILL;
  forest = Terrain.FOREST;
  grassland = Terrain.GRASSLAND;
  marsh = Terrain.MARSH;
  chasm = Terrain.CHASM;
}
