import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { isNumber, isNullOrUndefined, isNull, isString } from 'util';

declare var $: any;
@Injectable()
export class CheckisnullService {
    constructor(private _Toastr: ToastrService) { }
    public checknumber(_data: any, min?: number, max?: number): boolean {
        if (!isNullOrUndefined(_data)) {
            min = (!this.checkany(min) ? null : min);
            max = (!this.checkany(max) ? null : max);
            if (!isNumber(_data)) { return false; }
            const data = Number(_data);
            if (min != null && max != null) {
                return (data >= min && data <= max);
            } else if (min != null) {
                return (data >= min);
            } else if (max != null) {
                return (data <= max);
            }
            return true;
        } else {
            return false;
        }
    }
    public checknumberarray(data: any): boolean {
        let rs = true;
        data.forEach((item: any) => {
            if (!this.checknumber(item.val, item.min, item.max)) {
                rs = false; return;
            }
        });
        return rs;
    }
    public checkany(data: any): boolean {
        if (data && data != null && data !== 'null' && data !== 'undefined') {
            return true;
        }
        return false;
    }
    public checkanyDetail(data: any): boolean {
        if (data && data != null && data !== 'null' && data !== 'undefined') {
            return true;
        }
        return false;
    }
    public checkanyarray(data: any[]): boolean {
        let rs = true;
        data.forEach((item: any) => {
            if (!(item && item != null && item !== 'null' && item !== 'undefined')) {
                rs = false;
                return;
            }
        });
        return rs;
    }
    public checkanyarrayDetail(data: any[]): boolean {
        let rs = true;
        data.forEach((item: any) => {
            if (!(item && item != null && item !== 'null' && item !== 'undefined')) {
                rs = false;
                return;
            }
        });
        return rs;
    }
    public setfocus(fr: any, time?: number): void { 
        let div = null;
        setTimeout(() => {
            $(fr).find('.form-group').each(function () {
                if ($(this).find('input,select,textarea').length > 0) {
                    div = $(this);
                    return false;
                }
            });
            if (div == null)
                return false;
            if (div.find('.select2-container').length > 0) {
                div.find('span.select2-selection.select2-selection--single').focus();
                div.find('.select2-container').addClass('select2-container--focus');
            } else {
                div.find('input:eq(0)').focus();
            }
        }, time ? time : 10);
    }
    public setfocus_haserror(fr: any, time?: number, message?: boolean): void {
        setTimeout(() => {
            const div = $(fr).find('.form-group.has-error:eq(0)');
            if (div.find('.select2-container').length > 0) {
                div.find('select').select2('open');
            } else {
                ['input', 'textarea'].forEach(e => {
                    const selector = div.find(e).eq(0);
                    if (selector.length > 0) {
                        selector.focus();
                        return;
                    }
                });
            }
            //  if (!message || message === true) {
            if (isNullOrUndefined(message) || message === true) {
                this._Toastr.error('Vui lòng kiểm tra lại những nơi tô màu đỏ', 'Lỗi nhập không hợp lệ');
            }
        }, time ? time : 10);

    }
    formatMoney(number: any, places: any, symbol: any, thousand: any, decimal: any) {
        if (!(number)) { number = '0'; }
        number = '' + number;
        places = 4; // mặc định 4 số lẻ
        let so =number || 0;
        symbol = symbol !== undefined ? symbol : ''; // đơn vị
        thousand = thousand || '.';
        decimal = decimal || ',';
        if (number.includes('.') && number.indexOf('.') > -1) {
            places = number.substr(number.indexOf('.')).length > 4 ? 4 : number.substr(number.indexOf('.')).length;
        }
        const negative = parseFloat(number) < 0 ? '-' : '';
        so = so.abs().round(places);
        const stso = so.toString();
        const i = stso.substr(0, (stso.indexOf('.') > -1 ? stso.indexOf('.') : stso.length));
        let sole = decimal + (stso.substr(stso.indexOf('.') > -1 ? stso.indexOf('.') + 1 : stso.length));
        if (parseInt(sole.substr(1), undefined) === 0 || sole.substr(1) === '') {
            sole = '';
        } else {
            do {
                if (sole.substr(sole.length - 1) === '0') {
                    sole = sole.substr(0, sole.length - 1);
                } else {
                    break;
                }
            }
            while (true);
        }
        let num = i.replace(/^0*/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, thousand);
        if (!num) { num = '0'; }
        return negative + num + sole + symbol;
    }
    makeid(): string {
        let text = '';
        const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 8; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    checknull_response(res: any): boolean {
        return (JSON.stringify(res) === '{}');
    }

    // validate
    // thinhnq
    public validatetext(test, max, min): boolean {
        if (test && test != null && test !== 'null' && test !== 'undefined') {
            if (max != null && min != null) {
                if (test.length <= min || test.length > max) {
                    return false;
                }
            } else if (min != null) {
                if (test.length <= min) {
                    return false;
                }
            } else if (max != null) {
                if (test.length > max) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    validatefullname(fullname) {
        if (!this.checkany(fullname))//được phép rỗng
            return false;
        var reg = /^([a-z A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂưăạảấầẩẫậắằẳẵặẹẻẽếềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý]){5,120}$/;
        return reg.test(fullname);
    }
    validatetencoso(fullname) {
        if (!this.checkany(fullname))//được phép rỗng
            return false;
        var reg = /^([0-9a-z A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂưăạảấầẩẫậắằẳẵặẹẻẽếềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý]){4,250}$/;
        return reg.test(fullname);
    }
    validatemanv(manv) {
        if (!manv || manv == '')//được phép rỗng
            return true;
        var reg = /^([A-Za-z0-9]){1,10}$/;
        return reg.test(manv);
    }
    // Kiểm tra số điện thoại việt nam
    checkPhoneNumberVN(phone) {
        var flag = false;
        if (!this.checkany(phone))
            return flag;
        phone = phone.replace('(+84)', '0');
        phone = phone.replace('+84', '0');
        phone = phone.replace('0084', '0');
        if (phone.substring(0, 1) != '0')
            return false;
        phone = phone.replace(/ |\.|\-/g, '');
        if (phone != '') {
            var firstNumber = phone.substring(0, 1);
            if (firstNumber == '0' && phone.length == 10) {
                if (phone.match(/^\d{10}/)) {
                    flag = true;
                }
            }
            // var firstNumber = phone.substring(0, 2);
            // if ((firstNumber == '09' || firstNumber == '08') && phone.length == 10) {
            //     if (phone.match(/^\d{10}/)) {
            //         flag = true;
            //     }
            // }
            // else if (firstNumber == '02' && phone.length == 11) {
            //     if (phone.match(/^\d{11}/)) {
            //         flag = true;
            //     }
            // }
            // else if (firstNumber == '01' && phone.length == 11) {
            //     if (phone.match(/^\d{11}/)) {
            //         flag = true;
            //     }
            // }
        }
        return flag;
    }
    validateusername(user) {
        var reg = /^[0-9a-z\.\_\@]{5,45}$/;
        return reg.test(user);
    }
    validatepassword(password) {
        var reg = /^(?=.*[0-9])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,20}$/;
        return reg.test(password);
    }
    validatemasothue(masothue) {
        var reg = /^([a-zA-Z0-9]{10}|[a-zA-Z0-9]{13})$/;                                                 
        return reg.test(masothue);
    }
    validatemakichhoat(maso) {
        var reg = /^([0-9]{6})$/;
        return reg.test(maso);
    }
    // end thinhnq
    validateemail(email) {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        return reg.test(email);
    }
    validatePhoneNumber(phonenumber) {
        const reg = /^([0-9]){6,15}$/;
        return reg.test(phonenumber);
    }
    fixcoltable(num) {
        let div_el = $('.fixedleft');
        let w = 0;
        let left = div_el.scrollLeft();
        setTimeout(() => {
            div_el.find('thead tr:eq(0) th').each(function (i, el) {
                if ($(el).find('.width').length < 1)
                    $(el).append('<div class="width"></div>');
            })
            div_el.find('tbody tr:eq(0) td').each(function (i, el) {
                if ($(el).find('.width').length < 1)
                    $(el).append('<div class="width"></div>');
            })
            div_el.find('thead tr:eq(0) th').each(function (i, el) {
                let td = div_el.find('tbody tr:eq(0) td:eq(' + i + ')');
                $(el).find('div.width').width($(el).find('div.width').width());
                if (td.width() > $(el).width())
                    $(el).find('div.width').width(td.find('div.width').width() + 1);
                td.find('div.width').width($(el).find('div.width').width());
                w += $(el).width() + 1;
            })
            if (div_el.find('thead tr:eq(0)').width() < div_el.find('table').width() - 2) {
                let fixel = div_el.find('thead tr:eq(0) th[fix="true"] div.width');
                if (fixel.length > 0) {
                    fixel.width(fixel.width() + (div_el.find('table').width() - div_el.find('thead tr:eq(0)').width() - 2));
                    this.fixcoltable(num);
                }
            }
            for (let i = 0; i < num; i++) {
                div_el.find('thead th:eq(' + i + ')').addClass('fixcol').css('left', left);
                div_el.find('tbody tr').find('td:eq(' + i + ')').addClass('fixcol').css('left', left);
            }
            div_el.find('tfoot tr td:eq(0)').addClass('fixcol').width(w).css('left', left);
        }, 0);
        div_el.bind('scroll', function () {
            left = div_el.scrollLeft();
            for (let i = 0; i < num; i++) {
                div_el.find('thead th:eq(' + i + ')').css("left", left);
                div_el.find('tbody tr').find('td:eq(' + i + ')').css("left", left);
                div_el.find('tfoot tr td:eq(0)').css('left', left);
            }
        });
        $('.menu-toggler.sidebar-toggler,.fullscreen').unbind('click')
            .bind('click', () => {
                this.fixcoltable(num);
            });

    }
    fixcoltablecolname(num) {
        let div_el = $('.fixedleft');
        let w = 0;
        let left = div_el.scrollLeft();
        setTimeout(() => {
            div_el.find('thead tr th[colname]').each(function (i, el) {
                if ($(el).find('.width').length < 1)
                    $(el).append('<div class="width"></div>');
            })
            let ti = 0;
            let tr = null;
            do {
                if (div_el.find('tbody tr:eq(' + ti + ') td[colname]').length > 0) {
                    tr = div_el.find('tbody tr:eq(' + ti + ')');
                    break;
                }

                ti += 1;
            }
            while (tr == null || ti < 10)
            tr.find('td[colname]').each(function (i, el) {
                if ($(el).find('.width').length < 1)
                    $(el).append('<div class="width"></div>');
            })
            div_el.find('thead tr th[colname]').each(function (i, el) {
                let td = tr.find('td[colname="' + $(el).attr('colname') + '"]');
                $(el).find('div.width').width($(el).find('div.width').width());
                if (td.width() > $(el).width())
                    $(el).find('div.width').width(td.find('div.width').width() + 1);
                td.find('div.width').width($(el).find('div.width').width());
                w += $(el).width() + 1;
            })
            if (tr.width() < div_el.find('table').width() - 2) {
                let fixel = div_el.find('thead tr:eq(0) th[fix="true"] div.width');
                if (fixel.length > 0) {
                    fixel.width(fixel.width() + (div_el.find('table').width() - tr.width() - 2));
                    this.fixcoltable(num);
                }
            }
            for (let i = 0; i < num; i++) {
                div_el.find('thead th:eq(' + i + ')').addClass('fixcol').css('left', left);
                div_el.find('tbody tr').find('td:eq(' + i + ')').addClass('fixcol').css('left', left);
            }
            div_el.find('tfoot tr td:eq(0)').addClass('fixcol').width(w).css('left', left);
        }, 0);
        div_el.bind('scroll', function () {
            left = div_el.scrollLeft();
            for (let i = 0; i < num; i++) {
                div_el.find('thead th:eq(' + i + ')').css("left", left);
                div_el.find('tbody tr').find('td:eq(' + i + ')').css("left", left);
                div_el.find('tfoot tr td:eq(0)').css('left', left);
            }
        });
        $('.menu-toggler.sidebar-toggler,.fullscreen').unbind('click')
            .bind('click', () => {
                this.fixcoltable(num);
            });

    }
    loadscript(e, t, css?) {
        var check = false;
        if (this.checkany(css)) {
            $("link").each(function () {
                if ($(this).attr('href') == css) {
                    check = true;
                    return;
                }
            })
            if (!check) {
                var ac = document.getElementsByTagName("head")[0],
                    rc = document.createElement("link");
                rc.type = "text/css",
                    rc.href = css,
                    rc.rel = 'stylesheet';
                ac.appendChild(rc)
            }
            check = false;
        }
        $("script").each(function () {
            if ($(this).attr('src') == e) {
                check = true;
                return;
            }
        })
        if (check) {
            if (t)
                setTimeout(() => { t(); });
        }
        else {
            var a = document.getElementsByTagName("body")[0],
                r = document.createElement("script");
            r.type = "text/javascript",
                r.src = e,
                r.onload = t,
                a.appendChild(r)
        }
    }
    bodau(str: string) {
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
}
