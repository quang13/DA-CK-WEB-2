import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterKHComponent } from './dang-ky-member/dang-ky-member.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterTXComponent } from './dang-ky-taixe/dang-ky-taixe.component';
import { TaiXeCompopent } from './tai-xe/tai-xe.component';
import { AdminComponent } from './admin/admin-index';
//import { AuthGuard } from '../../../_guards'

const routes: Routes = [
    {
        "path": "",
        "component": PagesComponent,
        //"canActivate": [AuthGuard],
        "children": [
            // {
            //     "path": "admin",
            //     "loadChildren": ".\/admin\/admin.module#AdminModule"
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