import { NgModule } from "@angular/core";
import { RouterModule, Routes, TitleStrategy } from "@angular/router";
import { TemplatePageTitleStrategy } from "src/app/app-routing.module";
import { canDeactivateGuard } from "src/app/guard/can-deactivate.guard";
import { gameResolver } from "./game/game-resolver";
import { GameComponent } from "./game/game.component";

const routes: Routes = [
  {
    path: ':gameId',
    title: '',
    component: GameComponent,
    canDeactivate: [canDeactivateGuard],
    resolve: { game: gameResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
  ],
})
export class GameRoutingModule { }