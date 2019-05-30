import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  template: `
  <mat-dialog-content>
  <div class="swal2-icon swal2-warning swal2-animate-warning-icon" style="display: flex;"><span class="swal2-icon-text">!</span></div>
  <h4 class='text-center'>Bạn có muốn tiếp tục thực hiện?</h4>
  <p class='text-center'>{{data.Title}}!</p>
  </mat-dialog-content>
  <mat-dialog-actions align="center">
    <button mat-raised-button mat-dialog-close [mat-dialog-close]="'cancel'">hủy bỏ</button>
    <button *ngIf="!data.buttons" mat-raised-button color="primary" [mat-dialog-close]="true">Tiếp tục!</button>
    <ng-container *ngIf="data.buttons">
    <button *ngFor="let b of data.buttons" mat-raised-button [color]="b.color||'primary'" [mat-dialog-close]="b.emitkey">{{b.text}}</button>
    </ng-container>
  </mat-dialog-actions> `
})
export class ConfirmContinueComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
}