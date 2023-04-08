import { Injectable, NgModule } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { PreloadAllModules, RouterModule, RouterStateSnapshot, Routes, TitleStrategy } from "@angular/router";

const routes: Routes = [
  {
    path: 'game-selection',
    loadChildren: () => import('../game-selection/game-selection.module').then(m => m.GameSelectionModule),
  },
  {
    path: 'custom-game',
    loadChildren: () => import('../custom-game/custom-game.module').then(m => m.CustomGameModule),
  },
  {
    path: 'game',
    loadChildren: () => import('../game/game.module').then(m => m.GameModule),
  },
  { // redirect to 'game-selection'
    path: '',
    redirectTo: 'game-selection',
    pathMatch: 'full'
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
  imports: [
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: PreloadAllModules,
        //enableTracing: true,
      })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy},
  ],
})
export class AppRoutingModule { }