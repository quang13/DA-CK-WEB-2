import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Dangky } from './dangky.model';

@Injectable()
export class DangKyService {
  selectedDangKy: Dangky;
  dangky: Dangky[];
  readonly baseURL = 'http://localhost:8080/api/dangki';

  constructor(private http: HttpClient) { }

  postRegister(emp: Dangky) {
    return this.http.post(this.baseURL, emp);
  }

  getRegisterList() {
    return this.http.get(this.baseURL);
  }

  putRegister(emp: Dangky) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  deleteRegister(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
