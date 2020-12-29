import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStateService } from '../authentication/Auth-state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthStateService, private router: Router) {

  }
  canActivate(): Promise<boolean> {
     return this.auth.isUserSessionValid()
      .then(allow => {
        if (allow) {
          return true;
        } else {
          this.router.navigate(['/grs/login']);
          return false;
        }
      }).catch(err => {
        this.router.navigate(['/grs/login']);
        return false;
      });
  }
}
