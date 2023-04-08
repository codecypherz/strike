import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardCollection } from './collection/board-collection';
import { GameCollection } from './collection/game-collection';
import { PieceCollection } from './collection/piece-collection';
import { PieceSetCollection } from './collection/piece-set-collection';
import { DialogService } from './service/dialog.service';
import { GameService } from './service/game.service';
import { SelectService } from './service/select.service';
import { PageNotFoundComponent } from './ui/page-not-found/page-not-found.component';
import { GameChoiceComponent } from './ui/game-choice/game-choice.component';
import { GameModule } from 'src/game/game.module';
import { GameSelectionComponent } from './ui/game-selection/game-selection.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.INFO,
    }),
    GameModule,
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    GameSelectionComponent,
    GameChoiceComponent,
  ],
  providers: [
    // Services
    DialogService,
    GameService,
    SelectService,

    // Collections
    BoardCollection,
    GameCollection,
    PieceCollection,
    PieceSetCollection,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
