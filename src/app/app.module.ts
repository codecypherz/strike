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
import { BoardSetupComponent } from './board-setup/board-setup.component';
import { CustomGameProgressComponent } from './custom-game-progress/custom-game-progress.component';
import { PieceSelectionComponent } from './piece-selection/piece-selection.component';
import { PiecePlacementComponent } from './piece-placement/piece-placement.component';
import { CustomGameService } from 'src/model/custom-game.service';
import { TerrainSelectorComponent } from './terrain-selector/terrain-selector.component';
import { BoardSelectorComponent } from './board-selector/board-selector.component';
import { TerrainItemComponent } from './terrain-item/terrain-item.component';
import { BoardItemComponent } from './board-item/board-item.component';
import { SelectService } from 'src/model/select.service';
import { CustomPieceSetComponent } from './custom-piece-set/custom-piece-set.component';
import { AllPieceCollectionComponent } from './all-piece-collection/all-piece-collection.component';
import { PieceSetSelectorComponent } from './piece-set-selector/piece-set-selector.component';

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
    PieceSetSelectorComponent
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
    CustomGameService,
    DialogService,
    GameService,
    GameCollection,
    SelectService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
