import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTable, MatButtonModule, MatFormField, DateAdapter, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/_services/data.service';
import { DialogService } from 'src/app/_services/dialog.service';
import {DanhSachAdminCreateComponent} from './danh-sach-admin-create/danh-sach-admin-create.component';
@Component({
    selector: 'danh-sach-admin',
    templateUrl: './danh-sach-admin.component.html',
})
@Injectable()
export class DanhSachAdminComponent implements OnInit{
    private isLoading = false;
    private displayedColumn = ['TenDangNhap', 'TenHienThi', 'Email', 'SoDienThoai', 'BiXoa', 'ThaoTac'];
    private filterColumn = ['TenDangNhap', 'TenHienThi', 'Email', 'SoDienThoai', 'BiXoa'];
    private dataSource: any = new MatTableDataSource<any>();
    private API = 'localhost:8080/api/admin';
    @ViewChild(MatPaginator, null) paginator: MatPaginator;
    @ViewChild(MatSort, null) sort: MatSort;
    constructor(private _data: DataService, private _dialog: DialogService, private http: HttpClient)
    {

    }
    ngOnInit(){
        this.loaddata();
        this._data.mattable_custom(this.dataSource, this.paginator, this.sort, this.filterColumn);
    }

    loaddata()
    {
        this.isLoading = true;
        this.http.get(this.API)
        .subscribe((res: any) =>{
            this.dataSource.data = res;
            this.isLoading = false;
        });
    }

    opendialog(id: any)
    {
        this._dialog.open_dialog_create(DanhSachAdminCreateComponent, {Id: id}, () => this.loaddata());
    }

    delete(item)
    {
        this._dialog.open_dialog_confirm_delete({TiTle: 'Xoá admin' + item.TenHienThi}, ()=>{
            this.http.delete(this.API + '/delete/' + item._id)
            .subscribe((res: any) =>{
                this._data.toastr_delete_success();
                this.loaddata();
            }, (error) =>{
                throw error;
            });
        });
    }
}