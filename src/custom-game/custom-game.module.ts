import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoggerModule } from 'ngx-logger';
import { GameModule } from 'src/game/game.module';
import { CustomGameService } from 'src/custom-game/custom-game.service';
import { AllPieceCollectionComponent } from './all-piece-collection/all-piece-collection.component';
import { AllPieceItemComponent } from './all-piece-item/all-piece-item.component';
import { BoardItemComponent } from './board-item/board-item.component';
import { BoardSelectorComponent } from './board-selector/board-selector.component';
import { BoardSetupComponent } from './board-setup/board-setup.component';
import { CustomGameProgressComponent } from './custom-game-progress/custom-game-progress.component';
import { CustomGameRoutingModule } from './custom-game-routing.module';
import { CustomGameComponent } from './custom-game/custom-game.component';
import { CustomPieceItemComponent } from './custom-piece-item/custom-piece-item.component';
import { CustomPieceSetComponent } from './custom-piece-set/custom-piece-set.component';
import { PiecePlacementComponent } from './piece-placement/piece-placement.component';
import { PieceSelectionComponent } from './piece-selection/piece-selection.component';
import { PieceSetSelectorComponent } from './piece-set-selector/piece-set-selector.component';
import { PieceSetComponent } from './piece-set/piece-set.component';
import { TerrainItemComponent } from './terrain-item/terrain-item.component';
import { TerrainSelectorComponent } from './terrain-selector/terrain-selector.component';

@NgModule({
  imports: [
    CommonModule,
    LoggerModule.forChild(),
    CustomGameRoutingModule,
    GameModule,
  ],
  declarations: [
    CustomGameComponent,
    BoardSetupComponent,
    CustomGameProgressComponent,
    PieceSelectionComponent,
    PiecePlacementComponent,
    TerrainSelectorComponent,
    BoardSelectorComponent,
    TerrainItemComponent,
    BoardItemComponent,
    CustomPieceSetComponent,
    AllPieceCollectionComponent,
    PieceSetSelectorComponent,
    AllPieceItemComponent,
    CustomPieceItemComponent,
    PieceSetComponent
  ],
  providers: [
    CustomGameService,
  ],
})
export class CustomGameModule { }