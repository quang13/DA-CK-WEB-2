import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ContentChild, TemplateRef, ElementRef } from '@angular/core';
import { DataService } from 'src/app/_services/data.service';
import { FormControl } from '@angular/forms';
import { switchMap, debounceTime, tap, finalize, startWith, map, filter, takeUntil, delay } from 'rxjs/operators';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { text } from '@angular/core/src/render3';

@Component({
  selector: 'autocomplete-server-side',
  template: `
          <mat-form-field>
            <input [formControl]="Control" [ngClass]="inputClass" [placeholder]="Title" matInput [matAutocomplete]="auto" #el>
              <mat-autocomplete #auto="matAutocomplete" class="autocomplete" [panelWidth]="panelWidth">
                <cdk-virtual-scroll-viewport itemSize="20" style="height:200px">
                    <mat-option class="item" *cdkVirtualFor="let item of filtered | async;let i = index" 
                    [value]="item[ViewOption]" [disabled]="item.disabled" (onSelectionChange)="selectionChange($event,item)">
                      <ng-container *ngTemplateOutlet="itemTemplate; context: {item:item}">
                      </ng-container>
                    </mat-option>
                </cdk-virtual-scroll-viewport>
                <mat-option *ngIf="searching" class='loadding'><mat-progress-bar mode="indeterminate"></mat-progress-bar></mat-option>
              </mat-autocomplete>
          </mat-form-field>`
})
export class AutocompleteServerSideComponent implements OnInit, OnDestroy {
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
  @Input() Control = new FormControl();
  @Input() inputClass:string = '';
  @Input() panelWidth: string = '';
  @Output() SelectChange = new EventEmitter<FormControl>();
  private text: string = '';
  private emit: boolean = false;
  private searching: boolean = false;
  private dataSource: any[] = [];
  public FilterCtrl: FormControl = new FormControl();
  public filtered: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  protected _onDestroy = new Subject<void>();
  constructor(private _data: DataService) {
  }
  ngOnInit() {
    this.Control.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching = true),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map(search => {
          if (this.AlwaysEmit && this.text != search && !this.emit)
            this.SelectChange.emit(null);
          this.text = search;
          this.emit = false;
          return this._data.get(this.Api + search);
        }),
        delay(200)
      )
      .subscribe(filteredBanks => {
        filteredBanks.subscribe((res: any) => {
          this.searching = false;
          this.dataSource = res;
          this.filtered.next(this.dataSource.slice());
        }, (error) => {
          this.searching = false;
        });
      },
        error => {
          this.searching = false;
        });
  }
  protected selectionChange(event:any,value: any) {
    this.text = value[this.ViewOption];
    this.emit = true;
    if(event.isUserInput)
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
