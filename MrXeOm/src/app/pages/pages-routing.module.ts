import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterKHComponent } from './dang-ky-member/dang-ky-member.component';
import { HomeComponent } from './home/home.component';
<<<<<<< HEAD
import {LoginComponent}  from './login/login.component';
=======
import { LoginComponent } from './login/login.component';
>>>>>>> 0baf9b446d4ca8ac8a574e2fbb8bd42f5ef97052
import { RegisterTXComponent } from './dang-ky-taixe/dang-ky-taixe.component';
import { TaiXeCompopent } from './tai-xe/tai-xe.component';

const routes: Routes = [
    {
        "path": "",
        "component": PagesComponent,
        // "canActivate": [AuthGuardService],
        "children": [
            // {
            //     "path": "index",
            //     "loadChildren": ".\/default\/index.module#IndexModule"
            // },
            // {
            //     "path": "DangKyKhachHang",
            //     "loadChildren": "./dang-ky-member/dang-ky-member.module#DangKyMemberModule"
            // },
        ]
    },
    {
        path: '',
        component: HomeComponent,
        data: {
            title: 'Trang chủ'
        }
    },
    {
        path: 'dang-ky-khach-hang',
        component: RegisterKHComponent,
        data: {
            title: 'Đăng ký khách hàng'
        }
    },
    {
        path: 'dang-nhap',
        component: LoginComponent,
        data: {
            title: 'Đăng nhập'
        }
    },
    {
        path: 'dang-ky-tai-xe',
        component: RegisterTXComponent,
        data: {
            title: 'Đăng ký tài xế'
        }
    },
    {
        path: 'tai-xe',
        component: TaiXeCompopent,
        data: {
            title: 'Tài xế'
        }
    },
    {
        "path": "**",
        "redirectTo": "",
        "pathMatch": "full"
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule { }