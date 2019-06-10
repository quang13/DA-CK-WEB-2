import { Component, Inject } from '@angular/core';
import { DataService } from '../../../../_services/data.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ValidatorConstants } from '../../../../_common/ValidatorConstants';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'danh-sach-admin-create',
  templateUrl: './danh-sach-admin-create.component.html',
})
export class DanhSachAdminCreateComponent {
  private hidepass = true;
  private isLoading: boolean = false;
  private issave: boolean = false;
  private API = 'localhost:8080/api/admin';
  private formdata: FormGroup;
  private vali_const = ValidatorConstants;
  private const_data: any = {};
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DanhSachAdminCreateComponent>,
    private _data: DataService,
    private http: HttpClient
  ) {
    this.data.Id = this.data.Id || null;
    this.loaddata();
  }
  checkPasswords(group: FormGroup) {
    let pass = group.controls.MatKhau.value;
    let confirmPass = group.controls.MatKhauConf.value;
    return pass === confirmPass ? null : { notSame: true }
  }
  createform() {
    const newuser = this.data.Id == null;
    this.formdata = new FormGroup({
      TenDangNhap: new FormControl({ value: '', disabled: !newuser }, [Validators.required, Validators.pattern(this.vali_const.v_username)]),
      MatKhau: new FormControl('', newuser ? [Validators.required, Validators.pattern(this.vali_const.v_password)] : [Validators.pattern(this.vali_const.v_password)]),
      NhapLaiMatKhau: new FormControl(''),
      TenHienThi: new FormControl('', [Validators.required, Validators.pattern(this.vali_const.v_fullname)]),
      SoDienThoai: new FormControl('', [Validators.required, Validators.pattern(this.vali_const.v_phone)]),
      Email: new FormControl('', [Validators.required, Validators.pattern(this.vali_const.v_email)]),
      DiaChi: new FormControl('', [Validators.maxLength(250)]),
      BiXoa: new FormControl(false),
      MaLoaiTaiKhoan: new FormControl(0)
    }, this.checkPasswords);
  }
  setvalueform(values) {
    this.formdata.controls.TenDangNhap.setValue(values.TenDangNhap);
    this.formdata.controls.TenHienThi.setValue(values.TenHienThi);
    this.formdata.controls.SoDienThoai.setValue(values.SoDienThoai);
    this.formdata.controls.Email.setValue(values.Email);
    this.formdata.controls.DiaChi.setValue(values.DiaChi);
    this.formdata.controls.BiXoa.setValue(false);
  }
  loaddata() {
    this.createform();
    this.isLoading = true;
      this.http.post(this.API + '/insert', this.const_data)
      .subscribe((res: any) => {
        this.const_data = res;
        this.setvalueform(this.const_data);
        this.isLoading = false;
      }, (error) => {
        throw error;
        this.isLoading = false;
      });
  }
  savedata(values) {
    if (this.formdata.invalid) { this._data.toastr_validator(); return; }
    this.issave = true;
    let isadd = isNullOrUndefined(this.data.Id);
    if (isadd)
      this.const_data.TenDangNhap = values.TenDangNhap;
      this.const_data.MatKhau = values.MatKhau;
      this.const_data.TenHienThi = values.TenHienThi;
      this.const_data.SoDienThoai = values.SoDienThoai;
      this.const_data.Email = values.Email;
      this.const_data.DiaChi = values.DiaChi;
      this.const_data.BiXoa = values.BiXoa;
      this.const_data.MaLoaiTaiKhoan = 0;
      this.http.post(this.API + (isadd ? '/' : '/update/"'+this.data.Id+'"'), this.const_data)
      .subscribe((res: any) => {
        this.issave = false;
        this._data.toastr_save_success(isadd);
        this.dialogRef.close(true);
      }, (error) => {
        //throw error;
        console.log('Lỗi');
        this.issave = false;
      });
  }
}