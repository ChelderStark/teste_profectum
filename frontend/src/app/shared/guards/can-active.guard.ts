import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    console.log('isLoggedin');
    console.log(localStorage.getItem('isLoggedin'));
    if (localStorage.getItem('isLoggedin')) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
