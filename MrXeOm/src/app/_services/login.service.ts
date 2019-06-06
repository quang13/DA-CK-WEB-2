import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { TaiKhoan } from '../../../server/models/TaiKhoan.js';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class LoginService {
    constructor(private http: HttpClient) { }

    validateLogin(user: TaiKhoan){
        return this.http.post('../../../server/routes/api/login.js',{
            username : user.username,
            password : user.password
        })
    }
}