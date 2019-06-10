import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as _Admin from "./admin-index";
const routes: Routes = [
    {
        "path": "admin",
        "component": _Admin.AdminComponent,
        data: {
            title: 'Admin'
        },
        "children": [
            {
                "path": "danh-sach-admin",
                "component": _Admin.DanhSachAdminComponent,
                data: {
                    title: 'Danh sách admin'
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