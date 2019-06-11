import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { DangNhap } from './dangnhap.model';

@Injectable()
export class DangNhapService {
  selectedDangNhap: DangNhap;
  dangnhap: DangNhap[];
  readonly baseURL = 'http://localhost:8080/api/dangnhap';

  constructor(private http: HttpClient) { }

  postLogin(emp: DangNhap) {
    return this.http.post(this.baseURL, emp);
  }

  getLoginList() {
    return this.http.get(this.baseURL);
  }

}