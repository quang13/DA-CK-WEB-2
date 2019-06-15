// import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
// import { SystemConstants } from '../../_common/SystemConstants';
// import { ValidatorConstants } from '../../_common/ValidatorConstants';
// import { Title } from '@angular/platform-browser';
// import { Router, ActivatedRoute } from '@angular/router';
// import { ValidationService } from '../../_services/validation.service';
// import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// //import { DangNhapService } from '../../_services/dangnhap/dangnhap.service';
// //import { DangNhap } from '../../_services/dangnhap/dangnhap.model';

// @Component({
//     selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
//     templateUrl: "./login.component.html",
//     styleUrls: ['login.component.css'],
//     encapsulation: ViewEncapsulation.None,
//     //providers: [ DangNhapService ]
// })
// export class LoginComponent implements OnInit{
//     private loginForm: FormGroup;
//     private user: DangNhap;
//     private API = 'localhost:8080/dangnhap';
//     constructor(
//         private http: HttpClient,
//         private dangnhapService: DangNhapService,
//     ) {
//       this.user = new DangNhap();
//     }
//     ngOnInit() {
//     }
//     validateLogin() {
//       if(this.user.TenDangNhap && this.user.MatKhau) {
//           this.dangnhapService.validateLogin(this.user).subscribe(result => {
//           console.log('result is ', result);
//         }, error => {
//           console.log('error is ', error);
//         });
//       } else {
//           alert('Nhập Tên đăng nhập và mật khẩu');
//       }
//     }
// }
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../../_services/authentication.service';
import { AlertService } from '../../_services/alert.service';
import { ValidatorConstants } from '../../_common/ValidatorConstants';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormField, MatFormFieldModule, MatFormFieldControl} from '@angular/material';
@Component({
    templateUrl: "./login.component.html",
     styleUrls: ['login.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
    private vali = ValidatorConstants;
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        this.loginForm = new FormGroup({
            TenDangNhap: new FormControl('', [Validators.required, Validators.pattern(this.vali.v_username)]),
            MatKhau: new FormControl('', [Validators.required, Validators.pattern(this.vali.v_password)]),
            remember: new FormControl(true)
        });
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        if(this.f.remember.value ===true)
        {
            localStorage.setItem('RememberMe', this.f.TenDangNhap.value);
        }
        this.authenticationService.login(this.f.TenDangNhap.value, this.f.MatKhau.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
