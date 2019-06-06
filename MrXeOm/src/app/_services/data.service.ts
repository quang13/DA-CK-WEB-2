import { Injectable, HostListener, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MessageConstants } from '../_common/MessageConstants';
import { UrlConstants } from '../_common/UrlConstants';
import { Observable } from 'rxjs/Observable';
import { isNull } from 'util';
declare var $: any;


@Injectable()
export class DataService {
    private userlogin: any;
    public login_mess: any = null;
    public currencyMask = {
        align: 'left',
        prefix: '',
        suffix: ' đ',
        thousands: '.',
        decimal: ',',
        precision: 4,
        allowNegative: false
    };
    public currencyMaskSL = {
        align: 'left',
        prefix: '',
        suffix: '',
        thousands: '.',
        decimal: ',',
        precision: 4,
        allowNegative: false
    };
    constructor(private _http: HttpClient,
        private _router: Router,
        private _Login: LoginService,
        private _Toastr: ToastrService) {
        this._Toastr.toastrConfig.positionClass = 'toast-bottom-right';
    }
    //#number
    onKeyDownMoney(e: KeyboardEvent) {
        if (e.keyCode != 16 &&
            e.keyCode != 37 &&
            e.keyCode != 38 &&
            e.keyCode != 39 &&
            e.keyCode != 40 &&
            e.keyCode != 9 &&
            e.keyCode != 8 &&
            e.keyCode != 0 &&
            e.keyCode != 109 &&
            e.keyCode != 110 &&
            e.keyCode != 190 &&
            e.keyCode != 188 &&
            (e.keyCode < 48 || e.keyCode > 57) &&
            (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }
    onKeyDownNumber(e: KeyboardEvent) {
        if (e.keyCode != 16 &&
            e.keyCode != 37 &&
            e.keyCode != 38 &&
            e.keyCode != 39 &&
            e.keyCode != 40 &&
            e.keyCode != 9 &&
            e.keyCode != 8 &&
            e.keyCode != 0 &&
            (e.keyCode < 48 || e.keyCode > 57) &&
            (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }
    //#endregion number
    Scrollbar(el)
    {
        $(el).mCustomScrollbar({ theme: "minimal-dark", alwaysShowScrollbar: true });
    }
    addpathserver(url:string):string
    {
        return UrlConstants.BASE_API+url;
    }
    //#region toastr
    toastr_validator() {
        this._Toastr.error('Vui lòng kiểm tra lại những nơi được tô đỏ.', 'Thông tin chưa hợp lệ!');
    }
    toastr_create_success() {
        this._Toastr.success('Đã thêm mới thành công thông tin.', 'Thêm mới thành công!');
    }
    toastr_update_success() {
        this._Toastr.success('Đã lưu thành công thông tin chỉnh sửa.', 'Chỉnh sửa thành công!');
    }
    toastr_delete_success() {
        this._Toastr.success('Đã xóa thành công thông tin.', 'Xóa thành công!');
    }
    toastr_duplicate_error() {
        this._Toastr.error('Mã đã tồn tại.', 'Thông tin chưa hợp lệ!');
    }
    toastr_StartDate_EndDate_error() {
        this._Toastr.error('Ngày bắt đầu không được lớn hơn ngày kết thúc!');
    }
    toastr_currentpassword_error() {
        this._Toastr.error('Mật khẩu hiện tại không đúng !');
    }
    toastr_errormassage(body:any):boolean {
        if(body&&body.errorMassage)
        {
            this._Toastr.error(body.errorMassage);
            return true;
        }
       return false;
    }
    toastr_save_success(add: boolean) {
        add ? this.toastr_create_success() : this.toastr_update_success();
    }
    //#endregion toastr

    //#region mattable custom
    mattable_custom(datasource: MatTableDataSource<any>, mat_paginator: MatPaginator=null, mat_sort: MatSort=null, filterColumns: string[] = [], customfilter: any[] = []) {
        if(mat_paginator!=null)
        datasource.paginator = mat_paginator;
        if(mat_sort!=null)
        datasource.sort = mat_sort;
        datasource.filterPredicate =
            (data: any, filter: string) => {
                let result = false;
                if (customfilter && customfilter.length > 0)
                    customfilter.forEach(fun => {
                        if (fun(data, filter)) { result = true; return; }
                    });
                if (filterColumns && filterColumns.length > 0)
                    filterColumns.forEach(item => {
                        if (data[item]&&data[item].toString().trim().toLowerCase().indexOf(filter) != -1) { result = true; return; }
                    });
                return result;
            };
    }
    mattable_filter(filterValue: string, datasource: MatTableDataSource<any>) {
        datasource.filter = filterValue.trim().toLowerCase();
    }
    fun_filter_texttoboole(equa_filter: string, columnname: string) {
        return (row, filtervalue) => { if (filtervalue == equa_filter || filtervalue == this.vietnamse(equa_filter)) return row[columnname]; }
    }
    vietnamse(str: string) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
        str = str.replace(/\u02C6|\u0306|\u031B/g, "");
        return str;
    }
    //#endregion mattable custom

    //#region reques data
    // createrheader() {
    //     this.userlogin = this._Login.login(username: string, password: string);
    //     return {
    //         'Content-Type': 'application/json',
    //         'Authorization': (isNull(this.userlogin) ? '' : ("Bearer " + this.userlogin.access_token))
    //     };
    // }
    // get(uri: string) {
    //     let header = this.createrheader();
    //     return this._http.get(UrlConstants.BASE_API + uri, { headers: header });
    // }
    // post(uri: string, data?: any) {
    //     let header = this.createrheader();
    //     return this._http.post(UrlConstants.BASE_API + uri, data, { headers: header });
    // }
    // public handleError(error: any, el?: string) {
    //     if (error.status == 404) {
    //         this._Toastr.error(MessageConstants.API404);
    //         return;
    //     }
    //     if (error.status === 401) {
    //         clearTimeout(this.login_mess);
    //         this.login_mess = setTimeout(() => {
    //             this._Toastr.error(MessageConstants.LOGIN_AGAIN_MSG);
    //         }, 400);
    //         this._Login.logout();
    //         this._router.navigate([UrlConstants.LOGIN]);
    //         return;
    //     }
    //     if (error.status === 400) {
    //         let errMsg = '';
    //         try {
    //             const dummy = error.error || error.Message;
    //             if (Array.isArray(dummy)) {
    //                 errMsg = dummy.join('</br>');
    //             } else {
    //                 errMsg = dummy;
    //             }
    //         } catch (Error) { }
    //         try {
    //             if (!errMsg || 0 === errMsg.length) { errMsg = error._body; }
    //             if (errMsg.startsWith('"') && errMsg.endsWith('"')) {
    //                 errMsg = errMsg.slice(1, -1);
    //             }
    //         } catch (Error) { }
    //         if (errMsg !== '') {
    //             this._Toastr.error(errMsg);
    //         } else {
    //             this._Toastr.error(MessageConstants.MS400);
    //         }
    //     } else if (error.status === 406) {
    //         if (el != null) { $(el).remove(); }
    //         return;
    //     } else if (error.status === 403) {
    //         this._router.navigate([UrlConstants.ACCESSDENIED]);
    //     } else if (error.status === 405) {
    //         this._Toastr.error(MessageConstants.KHONGDUOCPHEP);
    //     } else if (error.status === 409) {
    //         this._Toastr.error(MessageConstants.CONFLICT_MSG);
    //     } else if (error.status === 0 || error.status === 500) {
    //         try {
    //             // có thông báo từ server trả về
    //             const str = error.error || error.Message;
    //             const from = str.indexOf('"ExceptionMessage":"') + 20;
    //             const to = str.indexOf('","ExceptionType":');
    //             const ms = str.substring(from, to);
    //             this._Toastr.error(ms);
    //         } catch (Error) {
    //             this._Toastr.error(MessageConstants.SERVE_ERROR_MSG);
    //         }
    //     } else {
    //         const errMsg = JSON.parse(error._body || '{}').error || '';
    //         if (errMsg.length > 0) {
    //             this._Toastr.error(errMsg);
    //             return Observable.throw(errMsg);
    //         }
    //     }
    // }
    //#endregion reques data
}
