import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TaiKhoan } from '../_models/taikhoan';

@Injectable({ providedIn: 'root' })
export class TaiKhoanService {
    private API = 'localhost:8080/api';
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<TaiKhoan[]>(this.API + '/member');
    }

    // getById(id: number) {
    //     return this.http.get(`${config.apiUrl}/users/${id}`);
    // }

    // register(user: User) {
    //     return this.http.post(`${config.apiUrl}/users/register`, user);
    // }

    // update(user: User) {
    //     return this.http.put(`${config.apiUrl}/users/${user.id}`, user);
    // }

    // delete(id: number) {
    //     return this.http.delete(`${config.apiUrl}/users/${id}`);
    // }
}