import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { DialogService } from 'src/app/service/dialog.service';
import { BoardCollection } from 'src/model/board-collection';
import { GameCollection } from 'src/model/game-collection';
import { GameService } from 'src/model/game.service';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';
import { GameChoiceComponent } from './game-choice/game-choice.component';
import { GameOverComponent } from './game-over/game-over.component';
import { GameSelectionComponent } from './game-selection/game-selection.component';
import { GameComponent } from './game/game.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PieceComponent } from './piece/piece.component';
import { PlayerComponent } from './player/player.component';
import { PlayersComponent } from './players/players.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { SelectedComponent } from './selected/selected.component';
import { CustomGameComponent } from './custom-game/custom-game.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CellComponent,
    GameOverComponent,
    PageNotFoundComponent,
    PieceComponent,
    PlayersComponent,
    PlayerComponent,
    SelectedComponent,
    GameSelectionComponent,
    GameComponent,
    GameChoiceComponent,
    GameOverComponent,
    CustomGameComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.INFO,
    }),
  ],
  providers: [
    BoardCollection,
    DialogService,
    GameService,
    GameCollection,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
