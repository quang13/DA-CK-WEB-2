import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { _PaginatorIntl } from '../../_services/paginator.service'
import { DialogService } from '../../_services/dialog.service'
import * as Material from "@angular/material";
import * as _Admin from "./admin-index";
import { from } from 'rxjs';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../_services/date.adapter.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { DanhSachAdminCreateComponent } from './danh-sach-admin/danh-sach-admin-create/danh-sach-admin-create.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        Material.MatToolbarModule,
        Material.MatGridListModule,
        Material.MatFormFieldModule,
        Material.MatInputModule,
        Material.MatRadioModule,
        Material.MatSelectModule,
        Material.MatCheckboxModule,
        Material.MatDatepickerModule,
        Material.MatNativeDateModule,
        Material.MatButtonModule,
        Material.MatProgressSpinnerModule,
        Material.MatDialogModule,
        Material.MatTableModule,
        Material.MatPaginatorModule,
        Material.MatSortModule,
        Material.MatSelectModule,
        Material.MatTreeModule,
        Material.MatIconModule,
        Material.MatMenuModule,
        Material.MatTooltipModule,
        CdkTreeModule,
        // SelectCustomModule
    ], declarations: [
        _Admin.AdminComponent,
        _Admin.DanhSachAdminCreateComponent,
    ],
    entryComponents: [
        _Admin.DanhSachAdminCreateComponent
    ],
    providers: [
        DialogService,
        { provide: Material.MatPaginatorIntl, useValue: _PaginatorIntl() },
        { provide: DateAdapter, useClass: AppDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ]
})
export class AdminModule {
}