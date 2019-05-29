import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
declare var $: any;
@Directive({
  selector: '[formControlName][MaBenhNhan]',
})
export class MaBenhNhanDirective {
  private timing = null;
  private key='';
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
    if ((event.code == 'Enter' || event.keyCode == 13)&&this.key.length<8)
      event.target.blur();
    if (this.timing == null) {
      this.key = '';
      this.timing = setTimeout(() => {
        clearTimeout(this.timing);
        this.timing = null;
        if (this.key.length >= 8)
        {
          const ctrl = this.ngControl.control;
          ctrl.setValue(this.key);
          this.ngControl.valueAccessor.writeValue(this.key);
          event.target.blur();
        }
      }, 200);
    }
    this.key += String.fromCharCode(event.keyCode);
  }
}
