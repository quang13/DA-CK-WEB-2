import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterKHComponent } from './dang-ky-member/dang-ky-member.component';
import { HomeComponent} from './home/home.component';
<<<<<<< HEAD
import {LoginComponent}  from './login/login.component'
=======
import { RegisterTXComponent } from './dang-ky-taixe/dang-ky-taixe.component';
import { TaiXeCompopent } from './tai-xe/tai-xe.component';
import { ReactiveFormsModule  } from '@angular/forms';
import { MatDatepickerModule, MatNativeDateModule, MatCardModule } from '@angular/material';
import { MaterialFileUploadComponent } from '../material-file-upload/material-file-upload.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
>>>>>>> de8afeb380066115a0b1d1e345705a7fd054b2fd

@NgModule({
    declarations: [
        RegisterKHComponent,
        HomeComponent,
<<<<<<< HEAD
        LoginComponent
=======
        RegisterTXComponent,
        TaiXeCompopent,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MaterialFileUploadComponent
>>>>>>> de8afeb380066115a0b1d1e345705a7fd054b2fd
    ],
    exports: [
        RegisterKHComponent,
        HomeComponent,
<<<<<<< HEAD
        LoginComponent
=======
        RegisterTXComponent,
        TaiXeCompopent,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MaterialFileUploadComponent
>>>>>>> de8afeb380066115a0b1d1e345705a7fd054b2fd
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        AngularFontAwesomeModule
    ],
    providers: [],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class  LayoutModule {
}