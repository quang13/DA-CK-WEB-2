import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { Helpers } from '../../../../../../../../Thực tập/SourcePhongKham/phongkham_giachuon/05 WebClient/Client/src/app/helpers';


@Directive({
    selector: "[appunwraptag]",
})
export class UnwrapTagDirective implements AfterViewInit {


    constructor(private el: ElementRef) {

    }
    ngAfterViewInit() {
        let nativeElement: HTMLElement = this.el.nativeElement;
        Helpers.unwrapTag(nativeElement);
    }

}