import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterKHComponent } from './dang-ky-member/dang-ky-member.component';
import { HomeComponent} from './home/home.component';
import {LoginComponent}  from './login/login.component'

@NgModule({
    declarations: [
        RegisterKHComponent,
        HomeComponent,
        LoginComponent
    ],
    exports: [
        RegisterKHComponent,
        HomeComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    providers: []
})
export class  LayoutModule {
}