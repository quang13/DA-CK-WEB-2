import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { DataService } from '../../_services/data.service';
import { isNullOrUndefined } from 'util';
declare let mLayout: any;
@Component({
    selector: "app-aside-nav",
    templateUrl: "./aside-nav.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class AsideNavComponent implements AfterViewInit {
    private isLoading: boolean = false;
    data_menu: any[] = [];
    private _util = isNullOrUndefined;
    constructor(private _data: DataService) {
        this.isLoading = true;
        this._data.get('/api/AppRoleFunction/getmenupage')
            .subscribe((res: any) => {
                this.data_menu = this.build_data(res, null);
                this.isLoading = false;
            }, (error) => {
                this._data.handleError(error);
                this.isLoading = false;
            });
    }
    ngAfterViewInit() {
        mLayout.initAside();
    }
    build_data(data: any[], parent) {
        let result = [];
        data.filter(s => s.Parent == parent).forEach(s => {
            let item = { ...s };
            item.children = this.build_data(data, s.AppPageID)
            result.push(item);
        });
        return result;
    }

}