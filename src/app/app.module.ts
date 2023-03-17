import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { PieceComponent } from './piece/piece.component';
import { CellComponent } from './cell/cell.component';
import { PlayersComponent } from './players/players.component';
import { PlayerComponent } from './player/player.component';
import { Board } from 'src/model/board';
import { BoardService } from 'src/model/board.service';
import { GameService } from 'src/model/game.service';
import { TurnService } from 'src/model/turn.service';
import { GameOverComponent } from './gameover/gameover.component';
import { SelectedComponent } from './selected/selected.component';
import { GameCollection } from 'src/model/gamecollection';
import { AppRoutingModule } from './routing/approuting.module';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { GameSelectionComponent } from './gameselection/gameselection.component';
import { GameComponent } from './game/game.component';
import { GameChoiceComponent } from './gamechoice/gamechoice.component';

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

  ],
  providers: [
    Board,
    BoardService,
    GameCollection,
    GameService,
    TurnService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
