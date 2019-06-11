import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { SystemConstants } from '../../_common/SystemConstants';
import { ValidatorConstants } from '../../_common/ValidatorConstants';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../_services/validation.service';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DangNhapService } from '../../_services/dangnhap/dangnhap.service';
import { DangNhap } from '../../_services/dangnhap/dangnhap.model';

@Component({
    selector: '.m-grid.m-grid--hor.m-grid--root.m-page',
    templateUrl: "./login.component.html",
    styleUrls: ['login.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ DangNhapService ]
})
export class LoginComponent implements OnInit{
    private loginForm: FormGroup;
    private user: DangNhap;
    private API = 'localhost:8080/dangnhap';
    constructor(
        private http: HttpClient,
        private dangnhapService: DangNhapService,
    ) {
      this.user = new DangNhap();
    }
    ngOnInit() {
    }
    validateLogin() {
      if(this.user.TenDangNhap && this.user.MatKhau) {
          this.dangnhapService.validateLogin(this.user).subscribe(result => {
          console.log('result is ', result);
        }, error => {
          console.log('error is ', error);
        });
      } else {
          alert('enter user name and password');
      }
    }
}