import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DangKyService } from '../../_services/dang-ky/dangky.service';
import { TaiKhoan } from '../../_models/taikhoan'
declare var M: any;
@Component({
  selector: 'app-dangkytaixe',
  templateUrl: './dang-ky-taixe.component.html',
  styleUrls: ['../pages.component.css'],
  providers: [DangKyService]
})
export class RegisterTXComponent implements OnInit {
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
      Avatar: ['', Validators.required],
      BienSoXe: ['', Validators.required],
  });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.dangkyService.selectedTaiKhoan = {
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
      BiXoa: false,
      MaLoaiTaiKhoan: 2,
      token: null
    };
  }

  onSubmit(form: NgForm) {
    if (form.value._id == '') {
      this.dangkyService.postRegister(form.value).subscribe((res) => {
        this.resetForm(form);
        // this.refreshRegisterList();
        M.toast({ html: 'Đăng ký thành công', classes: 'rounded' });
      });
    }
  }
}
