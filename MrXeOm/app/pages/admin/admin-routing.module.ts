import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as _Admin from "./admin-index";
const routes: Routes = [
    {
        "path": "",
        "component": _Admin.AdminComponent,
        data: {
            title: 'Admin'
        },
        "children": [
            {
                "path": "khai-bao-quyen",
                "component": _Admin.AppRoleComponent,
                data: {
                    title: 'Khai báo quyền'
                }
            },
            {
                "path": "khai-bao-chuc-nang",
                "component": _Admin.AppFunctionComponent,
                data: {
                    title: 'Khai báo chức năng'
                }
            },
            {
                "path": "khai-bao-trang",
                "component": _Admin.AppPageComponent,
                data: {
                    title: 'Khai báo trang'
                }
            }
            ,
            {
                "path": "phan-quyen-vao-chuc-nang",
                "component": _Admin.AppSetRoleComponent,
                data: {
                    title: 'Phân quyền'
                }
            },
            {
                "path": "thong-so-he-thong",
                "component": _Admin.ThongSoHeThongComponent,
                data: {
                    title: 'Thông số hệ thống'
                }
            },
            {
                "path": "khai-bao-tai-khoan",
                "component": _Admin.AppUserComponent,
                data: {
                    title: 'Khai báo tài khoản'
                }
            },
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }