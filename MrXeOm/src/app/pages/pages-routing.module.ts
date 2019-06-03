import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
import { RegisterKHComponent } from './dang-ky-member/dang-ky-member.component';
import { HomeComponent } from './home/home.component';

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