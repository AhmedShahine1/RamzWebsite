import { LocalService } from './../services/base/local.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/base/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public authService: AuthService,
              public router: Router,private localService:LocalService) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Guard for user is login or not
    // const user = JSON.parse(localStorage.getItem('user'));
    const user = JSON.parse(this.localService.getData('enkusr'))
    if (!user) {
      this.router.navigate(['/Account/login']);
      return true;
    }
    return true;
  }
}
