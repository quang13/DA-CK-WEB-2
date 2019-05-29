import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import * as moment from 'moment';
@Injectable()
export class DateTimeService {
  public getdate_truncate_time(date: any=null): Date {
    let _date: Date= new Date();
    if (isNullOrUndefined(date))
      _date = new Date();
    else if (date instanceof Date)
      _date = date;
    else if (date instanceof String||typeof date==='string')
      _date = new Date(date.toString())
    _date.setHours(0, 0, 0, 0);
    return _date;
  }
  gettime_truncate_date(date:any=null): string {
    let _date: Date= new Date();
    if (isNullOrUndefined(date))
      _date = new Date();
    else if (date instanceof Date)
      _date = date;
    else if (date instanceof String||typeof date==='string')
      _date = new Date(date.toString())
    return ('00' + _date.getHours()).slice(-2) + ':' + ('00' + _date.getMinutes()).slice(-2)
  }
  getdatetime(date: Date, time: string): Date {
    const _time = time.split(':');
    date.setHours(parseInt(_time[0]), parseInt(_time[1]), 0, 0);
    return date;
  }
  formatdate_toserve(date: any): string | null {
    if (date && (date instanceof Date))
      return moment(date).format('YYYY-MM-DD');
    return null;
  }
  formatdatetiem_toserve(date: any): string | null {
    if (date && (date instanceof Date))
      return moment(date).format('YYYY-MM-DD HH:mm');
    return null;
  }
  formatdate_toclient(date: any): Date | null {
    if (date)
      return new Date(date);
    return null;
  }
  formatdate_ddmmyyyy(date: any): string | null {
    let _date: Date= new Date();
    if (isNullOrUndefined(date))
      return '';
    else if (date instanceof Date)
      _date = date;
    else if (date instanceof String||typeof date==='string')
      _date = new Date(date.toString())
      return moment(date).format('DD/MM/YYYY');
  }
  formatdate_ddmmyyyyhhmm(date: any): string | null {
    let _date: Date= new Date();
    if (isNullOrUndefined(date))
      return '';
    else if (date instanceof Date)
      _date = date;
    else if (date instanceof String||typeof date==='string')
      _date = new Date(date.toString())
      return moment(date).format('DD/MM/YYYY HH:mm');
  }
}
