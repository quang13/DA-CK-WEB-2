import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ContentChild, TemplateRef } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { switchMap, debounceTime, tap, finalize, startWith, map, filter, takeUntil, delay } from 'rxjs/operators';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'select-server-side',
  template: `
          <mat-form-field>
            <mat-select #Ctrlselect class="icon-autocomplete-left" [formControl]="Control" (selectionChange)="selectionChange($event.value)" [placeholder]="Title">
              <mat-option>
                <ngx-mat-select-search (keydown)="move($event)" [formControl]="FilterCtrl" [placeholderLabel]="'Tìm kiếm '+ Title.toLowerCase()" [noEntriesFoundLabel]="'Không tìm thấy dòng nào!'" [searching]="searching">
                  <mat-icon ngxMatSelectSearchClear>close</mat-icon>
                </ngx-mat-select-search>
              </mat-option> 
              <cdk-virtual-scroll-viewport itemSize="20" style="height:200px">
              <mat-option *cdkVirtualFor="let item of filtered | async;let i = index" [value]="item" [disabled]="item.disabled">
              {{i}}<ng-container *ngTemplateOutlet="itemTemplate; context: {item:item}"></ng-container>
              </mat-option>
              </cdk-virtual-scroll-viewport>
            </mat-select>
            <button matSuffix *ngIf="Ctrlselect?.value" (click)="removeselection($event)" mat-icon-button tabindex="-1">
              <mat-icon>clear</mat-icon>
          </button>
          </mat-form-field> `
})
export class SelectServerSideComponent implements OnInit, OnDestroy {
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
  @Input() Title: string = '';
  @Input() Api: string = '';
  @Input() fnMap: Function = null;
  @Input() Control = new FormControl();
  @Output() SelectChange = new EventEmitter<FormControl>();
  private searching: boolean = false;
  private dataSource: any[] = [];
  public FilterCtrl: FormControl = new FormControl();
  public filtered: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  protected _onDestroy = new Subject<void>();
  @ViewChild('Ctrlselect') Ctrlselect: MatSelect;
  constructor(private _data: DataService) {
  }
  ngOnInit() {
    this.FilterCtrl.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching = true),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map(search => {
          return this._data.get(this.Api + search);
        }),
        delay(200)
      )
      .subscribe(filteredBanks => {
        filteredBanks.subscribe((res: any) => {
          this.dataSource = [];
          if (this.fnMap == null)
            this.dataSource = res.Data;
          else
            this.dataSource = this.fnMap(res.Data);
          this.searching = false;
          this.filtered.next(this.dataSource.slice());
        }, (error) => {
          this.searching = false;
        });
      },
        error => {
          this.searching = false;
        });
  }
  protected selectionChange(value: any) {
    this.SelectChange.emit(this.Control);
  }
  protected removeselection($event) {
    this.setInitialValue(null);
    this.SelectChange.emit(this.Control);
    if (!(this.Control.errors && this.Control.errors.required)) {
      $event.stopPropagation();
    }
  }
  protected setInitialValue(item: any) {
    this.Ctrlselect.value = item;
    this.Control.setValue(item);
    this.Ctrlselect.value = item;
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
