import * as moment from "moment";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "numbertrans"
})
export class NumberTransform implements PipeTransform {

    transform(number: string, symbol: string='', places: any=4,  thousand: string='.', decimal: string=','):string {
        if (!(number)) { number = '0'; }
        number = '' + number;
        places = 4; // mặc định 4 số lẻ
        let so =parseFloat(number) || 0;
        symbol = symbol !== undefined ? symbol : ''; // đơn vị
        thousand = thousand || '.';
        decimal = decimal || ',';
        if (number.includes('.') && number.indexOf('.') > -1) {
            places = number.substr(number.indexOf('.')).length > 4 ? 4 : number.substr(number.indexOf('.')).length;
        }
        const negative = parseFloat(number) < 0 ? '-' : '';
        so= Math.round(Math.abs(so));
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
}