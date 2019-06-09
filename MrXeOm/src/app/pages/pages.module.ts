import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterKHComponent } from './dang-ky-member/dang-ky-member.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterTXComponent } from './dang-ky-taixe/dang-ky-taixe.component';
import { TaiXeCompopent } from './tai-xe/tai-xe.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDatepickerModule, MatNativeDateModule, MatCardModule } from '@angular/material';
import { MaterialFileUploadComponent } from '../material-file-upload/material-file-upload.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
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
        FormsModule
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class  LayoutModule {
}