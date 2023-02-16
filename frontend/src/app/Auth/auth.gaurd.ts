import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LocalstorageService } from '../Shared/Service/localstorage.service';
import {
  UrlTree,
} from '@angular/router';


@Injectable({ providedIn: "root" })
export class AuthGaurd implements CanActivate {
    loggedin: string;

    config: any;
    constructor(
      private router: Router,
      private LsService: LocalstorageService
    ) { }
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
      this.loggedin = this.LsService.getItem("accountid");
          if (this.loggedin) {
            return true;}
          else {
            this.router.navigate(['auth']);
            return false;
          }
        }
         
}