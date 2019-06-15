import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterKHComponent } from './dang-ky-member/dang-ky-member.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterTXComponent } from './dang-ky-taixe/dang-ky-taixe.component';
import { TaiXeCompopent } from './tai-xe/tai-xe.component';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatDatepickerModule, MatNativeDateModule, MatCardModule, MatError, MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material';
import { MaterialFileUploadComponent } from '../material-file-upload/material-file-upload.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {JwtInterceptor} from '../_helpers/jwt.interceptor';
import {ErrorInterceptor} from '../_helpers/error.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http'
// import { DangKyComponent } from '../pages/dang-ky/';

@NgModule({
    declarations: [
        RegisterKHComponent,
        HomeComponent,
        LoginComponent,
        RegisterTXComponent,
        TaiXeCompopent,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MaterialFileUploadComponent,
        JwtInterceptor,
        ErrorInterceptor
        // DangKyComponent
    ],
    exports: [
        RegisterKHComponent,
        HomeComponent,
        LoginComponent,
        RegisterTXComponent,
        TaiXeCompopent,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MaterialFileUploadComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        AngularFontAwesomeModule,
        FormsModule,
        FormGroup,
        FormControl,
        MatError,
        MatFormField,
        //MatFormFieldControl,
        MatFormFieldModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
    ],
})
export class  LayoutModule {
}