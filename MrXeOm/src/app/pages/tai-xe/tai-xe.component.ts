import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialFileUploadComponent } from '../../material-file-upload/material-file-upload.component';


@Component({
  selector: 'app-taixe',
  templateUrl: './tai-xe.component.html',
  styleUrls: ['./tai-xe.component.css']
})
export class TaiXeCompopent implements OnInit {

  private form: FormGroup;
  private error: string;
  private userId: number = 1;
  private uploadResponse = { status: '', message: '', filePath: '' };

  constructor(
    private formBuilder: FormBuilder
  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
   }

   onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }
  
  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('avatar').value);

    // this.uploadService.upload(formData, this.userId).subscribe(
    //   (res) => this.uploadResponse = res,
    //   (err) => this.error = err
    // );
  }
}