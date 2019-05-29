import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { LoginService } from '../../_services/login.service';
import { Router } from '@angular/router';
import { UrlConstants } from '../../../../../../../../../Thực tập/SourcePhongKham/phongkham_giachuon/05 WebClient/Client/src/app/_common/UrlConstants';
declare let mLayout: any;
@Component({
    selector: "app-header-nav",
    templateUrl: "./header-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class HeaderNavComponent implements OnInit, AfterViewInit {
    private Profile: any = {};
    private URL: any;
    constructor(private _Login: LoginService,
        private router: Router) {
    }
    ngOnInit() {
        this.Profile = this._Login.getLoggedInUser();
        this.URL = UrlConstants.BASE_API + '/img/profile/' + this.Profile.avatar;
    }
    logout() {
        this._Login.logout();
        this.router.navigate([UrlConstants.LOGIN], { queryParams: { returnUrl: this.router.url } });
    }
    ngAfterViewInit() {
        mLayout.initHeader();
    }
}