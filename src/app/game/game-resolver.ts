import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot } from "@angular/router";
import { Game } from "src/model/game";
import { GameCollection } from 'src/model/gamecollection';
import {EMPTY, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

export const gameResolver: ResolveFn<Game> = (
  route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const router = inject(Router);
  const gameCollection = inject(GameCollection);

  // First, get the game id from the current route.
  const routeParams = route.paramMap;
  const id = String(routeParams.get('gameId'));

  // Second, fetch the game.
  return of(gameCollection.findById(id)).pipe(mergeMap(game => {
    if (game) {
      return of(game);
    } else {
      router.navigate(['/game-selection']);
      return EMPTY;
    }
  }));
}
