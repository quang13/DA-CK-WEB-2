import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../_services/login.service';
import { TaiKhoan } from '../../../../../server/models/TaiKhoan.js';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['../pages.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent {
    private loginForm: FormGroup;
    private loading = false;
    private submitted = false;
    private returnUrl: string;
    public taikhoan: TaiKhoan;
    constructor(private loginService: LoginService) {
      this.taikhoan = new TaiKhoan();
    }

    validateLogin() {
      if(this.taikhoan.username && this.taikhoan.password) {
          this.loginService.validateLogin(this.taikhoan).subscribe(result => {
          console.log('result is ', result);
        }, error => {
          console.log('error is ', error);
        });
      } else {
          alert('enter user name and password');
      }
    }
}