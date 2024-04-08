import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { LockingResourceService } from '@sabspl-frontend/shared';

@Injectable({
  providedIn: 'root'
})
export class LockingGuard implements CanActivate {

  constructor(
    private lockingResourceService: LockingResourceService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
      const path = state.url;
      this.lockingResourceService
        .isResourceLocked(path)
        .subscribe({
          next: (lockingResponse: any) => {
            if(lockingResponse.locked) {
              this.router.navigate(['/locked']);
              return false;
            }
          },
          error: (err: any) => {
            return false;
          }
        }
      );
      return true;
  }
}
