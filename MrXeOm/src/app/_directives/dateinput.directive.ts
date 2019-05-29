import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
declare var $: any;
@Directive({
  selector: '[formControlName][DateMask]',
})
export class DateMaskDirective {

  constructor(public ngControl: NgControl) { }
  @HostListener('keyup', ['$event'])
  onKeydownHandler(event) {
    this.onInputChange(event);
  }
  @HostListener('keypress', ['$event'])
  onkeypress(event) {
    if ((event.which < 48 || event.which > 57
      || (event.target.value.length >= 10 && ($(event.target)[0].selectionEnd - $(event.target)[0].selectionStart) == 0))) {
      event.preventDefault();
      return;
    }
  }
  onInputChange(event) {
    const value = event.target.value || '';
    let backspace = false;
    if (event.code == 'Backspace' || event.keyCode == 8)
      backspace = true;
    let newVal = value.replace(/\D/g, '');
    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length < 2) {
      newVal = newVal.replace(/^(\d{0,2})/, '$1');
    }
    else if (newVal.length == 2) {
      if (!backspace)
        newVal = newVal.replace(/^(\d{0,2})/, '$1/');
      else
        newVal = newVal.replace(/^(\d{0,2})/, '$1');
    }
    else if (newVal.length < 4) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,2})/, '$1/$2');
    }
    else if (newVal.length == 4) {
      if (!backspace)
        newVal = newVal.replace(/^(\d{0,2})(\d{0,2})/, '$1/$2/');
      else
        newVal = newVal.replace(/^(\d{0,2})(\d{0,2})/, '$1/$2');
    }
    else {
      newVal = newVal.substring(0, 8);
      newVal = newVal.replace(/^(\d{0,2})(\d{0,2})(\d{0,4})/, '$1/$2/$3');
    }
    //this.ngControl.valueAccessor.writeValue(newVal);
    event.target.value = newVal;
  }
}
