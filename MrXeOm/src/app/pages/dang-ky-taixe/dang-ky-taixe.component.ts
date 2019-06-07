import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DangKyService } from '../dang-ky/dangky.service';
import { Dangky } from '../dang-ky/dangky.model';

declare var M: any;

@Component({
  selector: 'app-dangkytaixe',
  templateUrl: './dang-ky-taixe.component.html',
  providers: [DangKyService]
})
export class RegisterTXComponent implements OnInit {

  constructor(private dangkyService: DangKyService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshRegisterList();
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
        this.refreshRegisterList();
        M.toast({ html: 'Đăng ký thành công', classes: 'rounded' });
      });
    } else {
      this.dangkyService.putRegister(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshRegisterList();
        M.toast({ html: 'Cập nhật thành công', classes: 'rounded' });
      });
    }
  }

  refreshRegisterList() {
    this.dangkyService.getRegisterList().subscribe((res) => {
      this.dangkyService.dangky = res as Dangky[];
    });
  }

  onEdit(emp: Dangky) {
    this.dangkyService.selectedDangKy = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.dangkyService.deleteRegister(_id).subscribe((res) => {
        this.refreshRegisterList();
        this.resetForm(form);
        M.toast({ html: 'Xoá thành công', classes: 'rounded' });
      });
    }
  }

}
