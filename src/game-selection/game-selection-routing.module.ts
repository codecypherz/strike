import { NgModule } from "@angular/core";
import { RouterModule, Routes, TitleStrategy } from "@angular/router";
import { TemplatePageTitleStrategy } from "src/app/app-routing.module";
import { GameSelectionComponent } from "./game-selection/game-selection.component";

const routes: Routes = [
  {
    path: '',
    title: '',
    component: GameSelectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
  ],
})
export class GameSelectionRoutingModule { }