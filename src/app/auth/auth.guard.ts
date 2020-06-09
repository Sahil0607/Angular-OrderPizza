import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | UrlTree |
     Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.authService.user.pipe(take(1), map(user => {
            // convert false to undefined ot null 
            // convert true to value, objn string or any value
            const isAuth = !!user;   // return boolean
            if (isAuth) {
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        }));
    }
}
