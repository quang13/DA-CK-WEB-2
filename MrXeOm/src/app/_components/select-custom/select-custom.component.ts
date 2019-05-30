import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ContentChild, TemplateRef, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { MatSelect, MatOption } from '@angular/material';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ValidatorConstants } from '../../_common/ValidatorConstants';

@Component({
  selector: 'select-custom',
  template: `
<mat-form-field>
  <mat-select #Ctrlselect class="icon-autocomplete-left" panelClass="{{panelClass}}" [formControl]="Control" [placeholder]="_title"
              (openedChange)="open($event)"
              (selectionChange)="selectionChange($event)">
    <mat-select-trigger *ngIf="Label">
      <ng-container *ngTemplateOutlet="labelTemplate; context: {value:Control.value}"></ng-container>
    </mat-select-trigger>
    <ngx-mat-select-search *ngIf="!HideSearch" [formControl]="FilterCtrl" class="filterselect" [placeholderLabel]="'Tìm kiếm '+ Title.toLowerCase()" [noEntriesFoundLabel]="'Không tìm thấy dòng nào!'">
      <mat-icon ngxMatSelectSearchClear>close</mat-icon>
    </ngx-mat-select-search>
    <ng-container *ngIf="!Viewport">
      <mat-option *ngFor="let item of filtered | async" [value]="item" [disabled]="item.disabled">
        <ng-container *ngTemplateOutlet="itemTemplate; context: {item:item}"></ng-container>
      </mat-option>
      <mat-option *ngIf="(filtered | async)?.length == 0" [value]="null">{{LabelNull}}</mat-option>
    </ng-container> 
    <ng-container *ngIf="Viewport">
      <cdk-virtual-scroll-viewport [itemSize]="28" class="example-viewport" [orientation]="'vertical'">
        <mat-option *cdkVirtualFor="let item of filtered | async" [value]="item" [disabled]="item.disabled" class="example-item">
          <ng-container *ngTemplateOutlet="itemTemplate; context: {item:item}"></ng-container>
        </mat-option>
        <mat-option *ngIf="(filtered | async)?.length == 0" [value]="null">{{LabelNull}}</mat-option>
      </cdk-virtual-scroll-viewport>
    </ng-container>
  </mat-select>
  <button matSuffix *ngIf="!HideClear&&Control?.value" (click)="removeselection($event)" mat-icon-button tabindex="-1">
    <mat-icon>clear</mat-icon>
  </button>
  <mat-error *ngIf="Control.errors?.required">{{vali_const.ms_required}}</mat-error>
</mat-form-field> `
})
export class SelectCustomComponent implements OnInit, OnDestroy {
  /**
* @ContentChild template option select
* @Title tiêu đề của control
* @Api api get dataSource cho select
* @Data nếu không có Api thì dataSource sẻ là Data
* @DefaultValue gán giá trị cho select
* @SelectChange sự kiện selected
* @Control là control của form
* @fnMap Map dữ liệu cho datasource : datasource = (data):array => {data.map(o =>{return {id: o.LoaiThuocID,text:o.TenLoai}})}
* @fnFilter hàm tìm kiếm nếu không có sẻ tìm theo 'text', fnFilter=(item:any,search:string):boolean=>{return item.text.toLowerCase().indexOf(search) > -1}
* @FilterBefore hàm lọc dữ liệu theo điều kiện
* @All hiển thị option All trong khung select : Nếu = true --> hiển thị All ? Không hiển thị All
* @HideSearch Ẩn search
* @HideClear Ẩn clear
**/
  @Input() Label: boolean = false;
  @ContentChild('itemTemplate') itemTemplate: TemplateRef<any>;
  @ContentChild('labelTemplate') labelTemplate: TemplateRef<any>;
  @ViewChild(CdkVirtualScrollViewport) _viewportscroll: CdkVirtualScrollViewport;
  @Input() panelClass: string = '';
  @Input() Title: string = '';
  private _title = '';
  @Input() Viewport: boolean = false;
  @Input() HideSearch: boolean = false;
  @Input() HideClear: boolean = false;
  @Input() All: boolean = false;
  private _Api: string = '';
  @Input()
  set Api(val: string) {
    if (val !== this._Api) {
      this._Api = val;
      this.loaddata();
    }
  }
  get Api(): string {
    return this._Api;
  }
  private isfilterbefore: boolean = false;
  private _filterbefore: Function = null;
  @Input()
  set FilterBefore(val: Function) {
    this.isfilterbefore = true;
    if (this.isload && val) {
      this.dataSource = this.AllData.filter(item => val(item));
      this.filtered.next(this.dataSource.slice());
      let itemselected = this.dataSource.find(s => s.id == this.DefaultValue) || null;
      this.setInitialValue(itemselected);
    }
    this._filterbefore = val;
  }
  get FilterBefore(): Function {
    return this._filterbefore;
  }
  @Input() LabelNull: string = 'Không có dữ liệu!';
  @Input() Data: any[] = [];
  @Input() fnFilter: any = null;
  @Input() fnMap: Function = null;
  @Input() Control = new FormControl();
  private _DefaultValue: any = null;
  @Input()
  set DefaultValue(val: any) {
    if (this.isload) {
      if (this.AllData && this.AllData.length > 0) {
        let item = this.AllData.find(s => s.id == val) || null;
        this.setInitialValue(item);
      }
      else {
        let item = this.dataSource.find(s => s.id == val) || null;
        this.setInitialValue(item);
      }
    }
    this._DefaultValue = val;
  }
  get DefaultValue(): any {
    return this._DefaultValue;
  }
  @Output() SelectChange = new EventEmitter<FormControl>();
  private isload = false;
  private dataSource: any[] = [];
  private AllData: any[] = [];
  public FilterCtrl: FormControl = new FormControl();
  public filtered: ReplaySubject<any[]>
    = new ReplaySubject<any[]>
      (1);
  protected _onDestroy = new Subject<void>
    ();
  @ViewChild('Ctrlselect') Ctrlselect: MatSelect;
  private vali_const = ValidatorConstants;
  private afterchange: boolean = false;
  constructor(private _data: DataService) {
  }
  ngOnInit() {
    this._title = this.Title + (this.Control.errors && this.Control.errors.required ? '*' : '');
    this.FilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filter();
      });
    this.isload = false;
    if (this.Data && this.Data.length > 0) {
      {  
        if (this.All)
          this.Data.unshift({ id: 'All', text: 'Tất cả', all: true });
        this.dataSource = this.Data;
        this.filtered.next(this.dataSource.slice());
        let itemselected =  this.dataSource.find(s => s.id == this.DefaultValue) || null;
        this.setInitialValue(itemselected);
        this.isload = true;
      }
    }
  }
  protected loaddata() {
    this.isload = false;
    if (this.Api && this.Api.length > 0) {
      this._data.get(this.Api).subscribe((res: any) => {
        if (this.isfilterbefore) {
          if (this.fnMap == null)
            this.AllData = res;
          else
            this.AllData = this.fnMap(res);
          if (this.All)
            this.AllData.unshift({ id: 'All', text: 'Tất cả', all: true });
          if (this.FilterBefore)
            this.dataSource = this.AllData.filter(item => this.FilterBefore(item));
          else
            this.dataSource = this.AllData;
        }
        else {
          if (this.fnMap == null)
            this.dataSource = res;
          else
            this.dataSource = this.fnMap(res);
          if (this.All)
            this.dataSource.unshift({ id: 'All', text: 'Tất cả', all: true });
        }
        this.filtered.next(this.dataSource.slice());
        let itemselected = null;
        if (this.DefaultValue && this.AllData && this.AllData.length > 0)
          itemselected = this.AllData.find(s => s.id == this.DefaultValue) || null;
        else if (this.DefaultValue && this.dataSource && this.dataSource.length > 0)
          itemselected = this.dataSource.find(s => s.id == this.DefaultValue) || null;
        this.setInitialValue(itemselected);
        this.isload = true;
      }, (error) => {
        this._data.handleError(error);
      });
    }
    else {
      this.dataSource = [];
      this.filtered.next(this.dataSource.slice());
      this.setInitialValue(null);
      this.isload = true;
    }
  }
  protected selectionChange(value: any) {
    this.SelectChange.emit(this.Control);
    if (this.Viewport) {
      this.afterchange = true;
      setTimeout(() => {
        this.afterchange = false;
      }, 200);
    }
  }
  protected removeselection($event) {
    this.setInitialValue(null);
    this.SelectChange.emit(this.Control);
    if (this.Viewport) {
      this.filtered.next(this.dataSource);
    }
    if (!(this.Control.errors && this.Control.errors.required)) {
      $event.stopPropagation();
    }
  }
  public setValue(value:any)
  {
    this.DefaultValue=value;
  }
  protected setInitialValue(item: any) {
    this.Ctrlselect.value = item;
    this.Control.setValue(item);
    let _next = false;
    if (this.dataSource.filter(s => s.autopush).length > 0) {
      this.dataSource = this.dataSource.filter(s => !s.autopush)
      _next = true;
    }
    if (item && this.dataSource.find(s => s.id == item.id) == null) {
      item.disabled = true;
      item.autopush = true;
      this.dataSource.push(item);
      _next = true;
    }
    if (_next)
      this.filtered.next(this.dataSource.slice());
    if (this.Viewport && item)
      this.filtered.next(this.dataSource.filter(s => s.id == item.id).slice());
    this.filtered
      .pipe(take(1),
        takeUntil(this._onDestroy))
      .subscribe(() => {
        this.Ctrlselect.compareWith = (a: any, b: any) => {
          if (b) return a.id == b.id
          else return a == b;
        };
      });
  }
  protected filter() {
    if (this.Viewport && this.afterchange) return;
    if (!this.dataSource) return;
    let search = this.FilterCtrl.value;
    if (!search) {
      this.filtered.next(this.dataSource.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    if (this.fnFilter == null)
      this.filtered.next(this.dataSource.filter(item => item.text.toLowerCase().indexOf(search) > -1));
    else
      this.filtered.next(this.dataSource.filter(item => this.fnFilter(item, search)));
  }
  open(ev: boolean) {
    if (ev) {
      if (this.Viewport) {
        if (this.Control.value != null && this.Control.value.id) {
          $('.example-viewport').addClass('hide');
          setTimeout(() => {
            this.filtered.next(this.dataSource);
          }, 10);
          const index = this.dataSource.findIndex(s => s.id == this.Control.value.id);
          setTimeout(() => {
            this._viewportscroll.scrollToIndex(index, 'auto');
            $('.example-viewport').removeClass('hide');
          }, 100);
        }
      }
    }
    else {
      if (this.Viewport) {
        if (this.Control.value != null && this.Control.value.id) {
          this.filtered.next(this.dataSource.filter(s => s.id == this.Control.value.id).slice());
        }
      }
    }
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  focus()
  {
    this.Ctrlselect.focused=true;
  }
}