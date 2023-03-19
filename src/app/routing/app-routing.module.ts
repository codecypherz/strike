import { Injectable, NgModule } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterModule, RouterStateSnapshot, Routes, TitleStrategy } from "@angular/router";
import { gameResolver } from "../game/game-resolver";
import { GameComponent } from "../game/game.component";
import { GameSelectionComponent } from "../game-selection/game-selection.component";
import { canDeactivateGuard } from "../guard/can-deactivate.guard";
import { PageNotFoundComponent } from "../page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: 'game-selection',
    title: '',
    component: GameSelectionComponent,
  },
  {
    path: 'game/:gameId',
    title: '',
    component: GameComponent,
    canDeactivate: [canDeactivateGuard],
    resolve: { game: gameResolver },
  },
  { // redirect to 'game-selection'
    path: '',
    redirectTo: 'game-selection',
    pathMatch: 'full'
  },
  { // Wildcard route for a 404 page
    path: '**',
    component: PageNotFoundComponent
  },
];

@Injectable({providedIn: 'root'})
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined && title.length > 0) {
      this.title.setTitle(`Strike | ${title}`);
    } else {
      this.title.setTitle(`Strike`);
    }
  }
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy},
  ],
})
export class AppRoutingModule { }