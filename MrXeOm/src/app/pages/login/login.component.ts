import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { SystemConstants } from '../../_common/SystemConstants';
import { ValidatorConstants } from '../../_common/ValidatorConstants';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../_services/validation.service';
//import { Helpers } from '../../helpers';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { HttpClient } from '@angular/common/http'

@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: "./login.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, AfterViewInit {
    login_fr: FormGroup;
    vali = ValidatorConstants;
    load: boolean = false;
    returnUrl: string;
    login_ms: string = '';
    private API = 'localhost:8080/dangnhap';
    constructor(
        private titleService: Title, private activated: ActivatedRoute,
        private router: Router, private validation: ValidationService,
        private fb: FormBuilder, private http: HttpClient,
    ) {
        this.login_fr = new FormGroup({
            TenDangNhap: new FormControl('', [Validators.required, Validators.pattern(this.vali.v_username)]),
            MatKhau: new FormControl('', [Validators.required, Validators.pattern(this.vali.v_password)]),
            remember: new FormControl(true)
        });
        this.titleService.setTitle('Đăng nhập');
        this.returnUrl = this.activated.snapshot.queryParams['returnUrl'] || '/';
        if (!isNullOrUndefined(localStorage.getItem('Người dùng hiện tại'))) {
            if (this.returnUrl && this.returnUrl.length > 0) {
                let url = this.sortParams(this.returnUrl);
                this.router.navigate([url.path], { queryParams: url.params });
            }
            else
                this.router.navigate(['/']); //về home
        }
        if (localStorage.getItem('Ghi nhớ') !== null)
            this.login_fr.controls['username'].setValue(localStorage.getItem(SystemConstants.REMEMBERME));
    }
    ngOnInit() {
    }
    // login(form_data) {
    //     if (this.login_fr.invalid)
    //         return;
    //     this.load = true;
    //     if (form_data.remember === true)
    //         localStorage.setItem('Ghi nhớ', form_data.TenDangNhap);
    //     else
    //         localStorage.removeItem('Ghi nhớ');
    //     this._Login.login(form_data.username, form_data.password)
    //         .subscribe(
    //             data => {
    //                 let user = data;
    //                 if (user && user.access_token) {
    //                     localStorage.setItem(SystemConstants.CURRENTUSER, JSON.stringify(user));
    //                 }
    //                 let url = this.sortParams(this.returnUrl)
    //                 this.router.navigate([url.path], { queryParams: url.params });
    //                 this.login_ms = '';
    //             },
    //             error => {
    //                 if (error.status == 400) {
    //                     let errMsg = error.error.error;
    //                     if (errMsg != '') {
    //                         this.login_ms = errMsg;
    //                     }
    //                     else {
    //                         this.login_ms = 'Tên đăng nhập hoặc mật khẩu không đúng!';
    //                     }
    //                 }
    //                 else {
    //                     this.login_ms = 'Tên đăng nhập hoặc mật khẩu không đúng!';
    //                 }
    //                 this.load = false;
    //             });
    // }
    login(form_data)
    {
      if (this.login_fr.invalid)
            return;
      this.load = true;
      if (form_data.remember === true)
        localStorage.setItem('Ghi nhớ', form_data.TenDangNhap);
      else
        localStorage.removeItem('Ghi nhớ');
        this.http.post(this.API, )
    }
    ngAfterViewInit() {
        Helpers.bodyClass('m-content--skin- m-header--static');
    }
    sortParams(url: string): any {
        const _url = url.split('?')[0];
        let queryParams = url.split('?')[1] || '';
        let params = queryParams.split('&');
        let pair = null;
        let data = {};
        params.forEach((d) => {
            pair = d.split('=');
            data[`${pair[0]}`] = pair[1];
        });
        return { path: _url, params: data };
    }
}