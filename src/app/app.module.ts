import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GameService } from 'src/model/game.service';
import { BoardCollection } from 'src/model/boardcollection';
import { GameCollection } from 'src/model/gamecollection';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CellComponent } from './cell/cell.component';
import { GameComponent } from './game/game.component';
import { GameChoiceComponent } from './gamechoice/gamechoice.component';
import { GameOverComponent } from './gameover/gameover.component';
import { GameSelectionComponent } from './gameselection/gameselection.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { PieceComponent } from './piece/piece.component';
import { PlayerComponent } from './player/player.component';
import { PlayersComponent } from './players/players.component';
import { AppRoutingModule } from './routing/approuting.module';
import { SelectedComponent } from './selected/selected.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { DialogService } from 'src/app/service/dialog.service';

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
