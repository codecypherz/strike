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

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.INFO,
    }),
  ],
  declarations: [
    AppComponent,
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
