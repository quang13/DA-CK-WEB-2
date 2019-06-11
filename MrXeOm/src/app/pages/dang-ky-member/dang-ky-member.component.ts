import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DangKyService } from '../../_services/dang-ky/dangky.service';
import { Dangky } from '../../_services/dang-ky/dangky.model';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var M: any;
@Component({
  selector: 'app-dangkykhachhang',
  templateUrl: 'dang-ky-member.component.html',
  styleUrls: ['../pages.component.css'],
  providers: [DangKyService]
})
export class RegisterKHComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private dangkyService: DangKyService, private formBuilder: FormBuilder) {
    // this.checkInForm = this.formBuilder.group({});
   }

  ngOnInit() {
    this.resetForm();
    // this.refreshRegisterList();
    this.registerForm = this.formBuilder.group({
      _id: ['', Validators.required],
      TenHienThi: ['', Validators.required],
      TenDangNhap: ['', Validators.required],
      MatKhau: ['', Validators.required],
      DiaChi: ['', [Validators.required, Validators.minLength(6)]],
      SoDienThoai: ['', Validators.required],
      Email: ['', Validators.required],
  });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.dangkyService.selectedDangKy = {
      _id: '',
      TenDangNhap: '',
      MatKhau: '',
      TenHienThi: '',
      DiaChi: '',
      SoDienThoai: '',
      CMND: '',
      Email: '',
      Avatar: '',
      HinhXe: '',
      BienSoXe: '',
      BiXoa: null,
      MaLoaiTaiKhoan: null,
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == '') {
      this.dangkyService.postRegister(form.value).subscribe((res) => {
        this.resetForm(form);
        // this.refreshRegisterList();
        M.toast({ html: 'Đăng ký thành công', classes: 'rounded' });
      });
    } else {
      this.dangkyService.putRegister(form.value).subscribe((res) => {
        this.resetForm(form);
        // this.refreshRegisterList();
        M.toast({ html: 'Cập nhật thành công', classes: 'rounded' });
      });
    }
  }

  // refreshRegisterList() {
  //   this.dangkyService.getRegisterList().subscribe((res) => {
  //     this.dangkyService.dangky = res as Dangky[];
  //   });
  // }

  // onEdit(emp: Dangky) {
  //   this.dangkyService.selectedDangKy = emp;
  // }

  // onDelete(_id: string, form: NgForm) {
  //   if (confirm('Are you sure to delete this record ?') == true) {
  //     this.dangkyService.deleteRegister(_id).subscribe((res) => {
  //       this.refreshRegisterList();
  //       this.resetForm(form);
  //       M.toast({ html: 'Xoá thành công', classes: 'rounded' });
  //     });
  //   }
  // }
}