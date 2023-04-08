import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { LoggerModule } from 'ngx-logger';
import { GameModule } from 'src/game/game.module';
import { GameChoiceComponent } from './game-choice/game-choice.component';
import { GameSelectionRoutingModule } from './game-selection-routing.module';
import { GameSelectionComponent } from './game-selection/game-selection.component';

@NgModule({
  imports: [
    CommonModule,
    LoggerModule.forChild(),
    GameSelectionRoutingModule,
    GameModule,
  ],
  declarations: [
    GameSelectionComponent,
    GameChoiceComponent,
  ],
})
export class GameSelectionModule { }
