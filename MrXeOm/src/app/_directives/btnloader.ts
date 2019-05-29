import { Directive, ElementRef, Input } from '@angular/core';
@Directive({
    selector: "[loader]",
})
export class btnloaderDirective {
    private count: number = 0;
    @Input('loader')
    set loader(value: boolean) {
        let btn_el: HTMLElement = this.el.nativeElement;
        if (value) {
            btn_el.classList.add('m-loader--brand', 'm-loader', 'm-loader--center');
            if (this.count == 0)
                this.count = 1;
            else
                setTimeout(() => {
                    btn_el.setAttribute('disabled', 'true');
                }, 10);
        }
        else {
            btn_el.classList.remove('m-loader', 'm-loader--center');
            if (this.count == 0)
                this.count = 1;
            else
                setTimeout(() => {
                    btn_el.removeAttribute('disabled');
                }, 10);
        }
    }
    constructor(private el: ElementRef) {
    }
}