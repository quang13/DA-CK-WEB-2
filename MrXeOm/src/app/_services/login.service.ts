import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { UrlConstants } from '../_common/UrlConstants';
import { SystemConstants } from '../_common/SystemConstants';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
@Injectable()
export class LoginService {
    public isrefetch_token: boolean = false;
    constructor(private http: HttpClient,  private _router: Router ) { }
    login(username: string, password: string) {
        let body = "userName=" + encodeURIComponent(username) +
            "&password=" + encodeURIComponent(password) +
            "&grant_type=password";
        return this.http.post<any>(UrlConstants.BASE_API + UrlConstants.Api_Login, body);
    }
    public logout() {
        localStorage.removeItem(SystemConstants.CURRENTUSER);
    }
    refetch_token(id: string, token: string) {
        this.isrefetch_token = true;
        let header = {
            'Content-Type': 'application/json',
            'Authorization': token
        };
        let body = "refresh_token=" + id +
            "&grant_type=refresh_token";
        return this.http.post(UrlConstants.BASE_API + UrlConstants.Api_Login, body, { headers: header });
    }
    getLoggedInUser() {
        if (isNullOrUndefined(localStorage.getItem(SystemConstants.CURRENTUSER)))
            return null;
        let user = JSON.parse(localStorage.getItem(SystemConstants.CURRENTUSER));
        let from = new Date(moment.utc().format());
        let to = new Date(user['.expires']);
        from.setMinutes(from.getMinutes() + 30);
        if (from > to) {
            if (!this.isrefetch_token)
                this.refetch_token(user.refresh_token, user.access_token).subscribe((res: any) => {
                    if (res && res.access_token) {
                        localStorage.setItem(SystemConstants.CURRENTUSER, JSON.stringify(res));
                        this.isrefetch_token = false;
                    }
                }, (error) => {
                    this.isrefetch_token = false;
                    this.logout();
                    this._router.navigate([UrlConstants.LOGIN]);
                });;
        }
        return user;
    }
}