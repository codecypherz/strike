import { NgModule } from "@angular/core";
import { RouterModule, Routes, TitleStrategy } from "@angular/router";
import { TemplatePageTitleStrategy } from "src/app/app-routing.module";
import { BoardSetupComponent } from "./board-setup/board-setup.component";
import { CustomGameComponent } from "./custom-game/custom-game.component";
import { PiecePlacementComponent } from "./piece-placement/piece-placement.component";
import { PieceSelectionComponent } from "./piece-selection/piece-selection.component";

const routes: Routes = [
  {
    path: '',
    title: '',
    component: CustomGameComponent,
    children: [
      {
        path: 'board-setup',
        component: BoardSetupComponent,
      },
      {
        path: 'piece-selection',
        component: PieceSelectionComponent,
      },
      {
        path: 'piece-placement',
        component: PiecePlacementComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
  ],
})
export class CustomGameRoutingModule { }