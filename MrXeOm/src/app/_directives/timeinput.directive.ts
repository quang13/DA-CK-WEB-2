import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][TimeMask]',
})
export class TimeMaskDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }
  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }
  @HostListener("blur", ['$event'])
  onBlur(event) {
    let value = this.ngControl.value || '';
    if (value.length > 0) {
      value = (value.replace(/\D/g, '') + '0000').substring(0, 4);
      event.target.value = this.onInputChange(value, false);

    }

  }
  onInputChange(event, backspace): string {
    if (event) {
      let newVal = event.replace(/\D/g, '');
      if (newVal.length === 0) {
        newVal = '';
      } else if (newVal.length < 2 || (backspace && newVal.length == 2)) {
        newVal = newVal.replace(/^(\d{0,2})/, '$1');
      }
      else if (!backspace && newVal.length == 2) {
        newVal = newVal.replace(/^(\d{0,2})/, '$1:');
      }
      else {
        newVal = newVal.substring(0, 4);
        newVal = newVal.replace(/^(\d{0,2})(\d{0,2})/, '$1:$2');
      }
      this.ngControl.valueAccessor.writeValue(newVal);
      return newVal;
    }
  }
}

