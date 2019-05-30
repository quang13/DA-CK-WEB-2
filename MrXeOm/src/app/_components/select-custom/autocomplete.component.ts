import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ContentChild, TemplateRef, ElementRef } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { FormControl } from '@angular/forms';
import { switchMap, debounceTime, tap, finalize, startWith, map, filter, takeUntil, delay } from 'rxjs/operators';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { text } from '@angular/core/src/render3';

@Component({
  selector: 'autocomplete',
  template: `
          <mat-form-field>
            <input [formControl]="Control" [placeholder]="Title" matInput [matAutocomplete]="auto" #el>
              <mat-autocomplete #auto="matAutocomplete" class="autocomplete" [panelWidth]="panelWidth">
                <cdk-virtual-scroll-viewport itemSize="20" style="height:200px">
                    <mat-option class="item" [ngClass]="itemClass" *cdkVirtualFor="let item of filtered | async;let i = index" 
                    [value]="item[ViewOption]" [disabled]="item.disabled" (onSelectionChange)="selectionChange($event,item)">
                      <ng-container *ngTemplateOutlet="itemTemplate; context: {item:item}">
                      </ng-container>
                    </mat-option>
                </cdk-virtual-scroll-viewport>
                <mat-option *ngIf="searching" class='loadding'><mat-progress-bar mode="indeterminate"></mat-progress-bar></mat-option>
              </mat-autocomplete>
          </mat-form-field>`
})
export class AutocompleteComponent implements OnInit, OnDestroy {
  /**
* @ContentChild template option select
* @Title tiêu đề của control
* @Api api get dataSource cho select
* @DefaultValue gán giá trị cho select
* @SelectChange sự kiện selected
* @Control là control của form 
* @fnMap Map dữ liệu cho datasource : datasource = (data):array => {data.map(o =>{return {id: o.LoaiThuocID,text:o.TenLoai}})}
**/
  @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;
  @ViewChild('el') el: ElementRef;
  @Input() Title: string = '';
  @Input() AlwaysEmit: boolean = false;
  @Input() ViewOption: string = '';
  @Input() Api: string = '';
  @Input() Data: any[] = null;
  @Input() Control = new FormControl();
  @Input() panelWidth: string = '';
  @Input() itemClass: string = '';
  @Output() SelectChange = new EventEmitter<FormControl>();
  @Input() fnFilter: any = null;
  private text: string = '';
  private emit: boolean = false;
  private searching: boolean = false;
  private dataSource: any[] = [];
  public FilterCtrl: FormControl = new FormControl();
  public filtered: Observable<string[]>;
  protected _onDestroy = new Subject<void>();
  constructor(private _data: DataService) {
  }
  ngOnInit() {
    if (this.Data == null)
      this._data.get(this.Api)
        .subscribe((res: any[]) => {
          this.dataSource = res;
        });
    else
      this.dataSource = this.Data;
    this.filtered = this.Control.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val).slice())
      );
  }
  filter(val: string): string[] {
    if (this.AlwaysEmit && this.text != val && !this.emit)
      this.SelectChange.emit(null);
    this.text = val;
    this.emit = false;
    val = val || '';
    if (this.fnFilter == null)
      return this.dataSource.filter(item =>
        item[this.ViewOption].toLowerCase().includes(val.toLowerCase()));
    else
      return this.dataSource.filter(item => this.fnFilter(item, val.toLowerCase()));
  }
  protected selectionChange(event: any, value: any) {
    this.text = value[this.ViewOption];
    this.emit = true;
    if (event.isUserInput)
      this.SelectChange.emit(value);
  }
  focus() {
    this.el.nativeElement.focus();
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
