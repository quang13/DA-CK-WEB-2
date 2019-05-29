import { Component,Input } from '@angular/core';

@Component({
  selector:'loading',
  template: `
  <div *ngIf="Load" class="m-page-loader m-page-loader--base m-page-loader--non-block" style="margin-left: -80px; margin-top: -20px;position: absolute;display: block; ma">
    <div class="m-blockui">
      <span>
        Đang tải...
      </span>
      <span>
        <div class="m-loader m-loader--brand"></div>
      </span>
    </div>
  </div>`
})
export class LoadingComponent {
  @Input()Load:boolean=false;
  constructor() {
  }
}
