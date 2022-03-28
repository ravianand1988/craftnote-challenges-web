import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  UrlTree,
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { APP_SETTINGS } from 'src/app/settings';

@Injectable()
export class AuthGuardService implements CanActivateChild {
  constructor(
    private router: Router,
  ) { }

  /**
   * Return whether the given route can be activated by looking at its component.
   */
  public canActivateChild(snapshot: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const requiresAuth = !this._isNoAuthRoute(snapshot);
    const user$ = of(null); // of({ name: 'ravi', email: 'r.k@cbs.com' });

    return user$.pipe(
      first(),
      map((user) => {
        if (!user && requiresAuth) {
          this.router.navigateByUrl(APP_SETTINGS.DEFAULT_ROUTE);
        } else if (user && !requiresAuth) {
          this.router.navigateByUrl(APP_SETTINGS.DEFAULT_AUTH_ROUTE);
        }

        return true;
      }),
    );
  }

  /** Return whether the child route should be exempt from auth restrictions */
  private _isNoAuthRoute(snapshot: ActivatedRouteSnapshot): boolean {
    const { children, component } = snapshot;

    if (component && APP_SETTINGS.NO_AUTH_ROUTES.includes(component as any)) {
      return true;
    } else if (children) {
      return children.some(child => this._isNoAuthRoute(child));
    }

    return false;
  }
}
