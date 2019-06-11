import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { DangNhap } from './dangnhap.model';

@Injectable()
export class DangNhapService {
  constructor(private http: HttpClient) { }

  validateLogin(user: DangNhap){
    return this.http.post('localhost:8080/api/dangnhap',{
        username : user.TenDangNhap,
        password : user.MatKhau
    })
}
}