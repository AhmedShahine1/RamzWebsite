import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalService } from '../services/base/local.service';
import { AuthService } from '../services/sc/auth.service';

@Injectable({
    providedIn: 'root'
})

export class SecureInnerPagesGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router,private localService:LocalService) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        // let user = JSON.parse(localStorage.getItem('user'));
        let user = this.localService.getData(localStorage.getItem('enkusr')!)
        if (this.authService.isLoggedIn) {
            window.alert("You are not allowed to access this URL!");
            this.router.navigate(['/page/home'])
        }
        return true;
    }
}