import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UrlConstants } from '../../../../../../../../Thực tập/SourcePhongKham/phongkham_giachuon/05 WebClient/Client/src/app/_common/UrlConstants';
import { SystemConstants } from '../../../../../../../../Thực tập/SourcePhongKham/phongkham_giachuon/05 WebClient/Client/src/app/_common/SystemConstants';
import { isNullOrUndefined } from 'util';
@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!isNullOrUndefined(localStorage.getItem(SystemConstants.CURRENTUSER))) {
            return true;
        }
        else {
            this.router.navigate([UrlConstants.LOGIN], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}