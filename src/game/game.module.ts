import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { LoggerModule } from 'ngx-logger';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';
import { GameOverComponent } from './game-over/game-over.component';
import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game/game.component';
import { PieceComponent } from './piece/piece.component';
import { PlayerComponent } from './player/player.component';
import { PlayersComponent } from './players/players.component';
import { SelectedComponent } from './selected/selected.component';

@NgModule({
  imports: [
    CommonModule,
    LoggerModule.forChild(),
    GameRoutingModule,
  ],
  declarations: [
    BoardComponent,
    CellComponent,
    GameOverComponent,
    PieceComponent,
    PlayersComponent,
    PlayerComponent,
    SelectedComponent,
    GameComponent,
    GameOverComponent,
  ],
  exports: [
    BoardComponent,
    PieceComponent,
    SelectedComponent,
  ],
})
export class GameModule { }
