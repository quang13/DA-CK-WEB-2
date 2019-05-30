import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from "@angular/material";
export class AppDateAdapter extends NativeDateAdapter {
    parse(value: any): Date | null {
        if ((typeof value === 'string') && value.length == 10) {
            let str = []
            if (value.split('/').length == 3)
                str = value.split('/');
            if (value.split('-').length == 3)
                str = value.split('-');
            const date = Number(str[0]);
            const month = Number(str[1]) - 1;
            const year = Number(str[2]);
            return new Date(year, month, date);
        }
        return null;
    }
    format(date: Date, displayFormat: string): string {
        if (displayFormat == "input") {
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
        } else if (displayFormat == "inputMonth") {
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            return this._to2digit(month) + '/' + year;
        } else {
            return date.toDateString();
        }
    }
    private _to2digit(n: number) {
        return ('00' + n).slice(-2);
    }
}
export const APP_DATE_FORMATS =
{
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
    },
    display: {
        dateInput: 'input',
        monthYearLabel: 'inputMonth',
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
}