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
import { PlayerService } from 'src/model/player.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PieceComponent,
    CellComponent,
    PlayersComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    Board,
    BoardService,
    GameService,
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
