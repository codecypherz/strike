import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BoardService } from 'src/model/board.service';
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
    BoardCollection,
    BoardService,
    GameCollection,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
