import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChildFn, Router, RouterStateSnapshot } from "@angular/router";
import { CustomGameService } from "src/model/custom-game.service";

export const canActivateCustomSetupGuard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const customGameService = inject(CustomGameService);
  const router = inject(Router);

  if (customGameService.hasActiveGame()) {
    return true;
  } else {
    router.navigate(['/game-selection']);
    return false;
  }
};