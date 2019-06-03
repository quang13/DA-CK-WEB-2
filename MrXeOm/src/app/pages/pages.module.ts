import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegisterKHComponent } from './dang-ky-member/dang-ky-member.component';
import { HomeComponent} from './home/home.component';

@NgModule({
    declarations: [
        RegisterKHComponent,
        HomeComponent
    ],
    exports: [
        RegisterKHComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    providers: []
})
export class  LayoutModule {
}