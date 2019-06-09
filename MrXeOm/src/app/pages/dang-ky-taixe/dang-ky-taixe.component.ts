import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DangKyService } from '../dang-ky/dangky.service';
import { Dangky } from '../dang-ky/dangky.model';

declare var M: any;
@Component({
  selector: 'app-dangkytaixe',
  templateUrl: './dang-ky-taixe.component.html',
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
  });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
    this.dangkyService.selectedDangKy = {
      _id: '',
      MaTaiKhoan: null,
      TenDangNhap: '',
      MatKhau: '',
      TenHienThi: '',
      DiaChi: '',
      SoDienThoai: '',
      Email: '',
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
}
