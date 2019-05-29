import { isNullOrUndefined } from 'util';
import { Injectable } from '@angular/core';
@Injectable()
export class ValidationService {
    public validatetext(test: any, max: number, min: number): boolean {
        if (isNullOrUndefined(test)) {
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
    validatefullname(fullname: string) {
        if (isNullOrUndefined(fullname))//được phép rỗng
            return false;
        var reg = /^([a-z A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂưăạảấầẩẫậắằẳẵặẹẻẽếềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý]){5,120}$/;
        return reg.test(fullname);
    }
    // Kiểm tra số điện thoại việt nam
    checkPhoneNumberVN(phone) {
        var flag = false;
        if (isNullOrUndefined(phone))
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
}
