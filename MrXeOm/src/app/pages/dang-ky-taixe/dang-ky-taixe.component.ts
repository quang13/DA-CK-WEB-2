import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registerTX',
  templateUrl: 'dang-ky-taixe.component.html',
  styleUrls: ['../pages.component.css']
})
export class RegisterTXComponent implements OnInit {
    private registerForm: FormGroup;
    private loading = false;
    private submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      identityCard: ['', Validators.required],
  });
  }
}