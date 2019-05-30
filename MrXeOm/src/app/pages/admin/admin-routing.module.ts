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
            // {
            //     "path": "khai-bao-tai-khoan",
            //     "component": _Admin.AppUserComponent,
            //     data: {
            //         title: 'Khai báo tài khoản'
            //     }
            // },
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }