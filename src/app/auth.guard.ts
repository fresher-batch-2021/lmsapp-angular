import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let user = localStorage.getItem("LOGGED_IN_USER");
      let userData = user != null ? JSON.parse(user) : null;
      console.log("AuthGuard :" ,user );
      if(user != null){
        return true;
      }
      else{
        alert("You are not authorized to access this page");
        this.router.navigate(["/login"])
      }
    return true;
  }
}
