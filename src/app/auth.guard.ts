import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let user = localStorage.getItem("LOGGED_IN_USER");
      let userData = user != null ? JSON.parse(user) : null;
      console.log("AuthGuard :" ,user );
      if(user != null && userData[0].role != 'hr'){
        return true;
      }
      else{
        alert("You are not authorized to access this page");
        window.location.href="login";
        //this.router.navigateByUrl("login");
        //return false;
      }
    return true;
  }
  
}