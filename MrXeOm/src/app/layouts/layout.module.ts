import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { AsideNavComponent } from './aside-nav/aside-nav.component';
import { FooterComponent } from './footer/footer.component';
import { QuickSidebarComponent } from './quick-sidebar/quick-sidebar.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HrefPreventDefaultDirective } from '../_directives/href-prevent-default.directive';
import { btnloaderDirective } from '../_directives/btnloader';
import { UnwrapTagDirective } from '../_directives/unwrap-tag.directive';
import { LoaddingComponent } from '../_components/loadding/loadding.component';
import { TimeMaskDirective } from '../_directives/timeinput.directive';
import { DateMaskDirective } from '../_directives/dateinput.directive';
import { MaBenhNhanDirective } from '../_directives/mabenhnhan.directive';
import { NumberTransform } from '../_services/number.transform';
@NgModule({
    declarations: [
        LayoutComponent,
        HeaderNavComponent,
        AsideNavComponent,
        FooterComponent,
        QuickSidebarComponent,
        ScrollTopComponent,
        TooltipsComponent,
        HrefPreventDefaultDirective,
        btnloaderDirective,
        UnwrapTagDirective,
        LoaddingComponent,
        TimeMaskDirective,
        DateMaskDirective,
        MaBenhNhanDirective,
        NumberTransform
    ],
    exports: [
        LayoutComponent,
        HeaderNavComponent,
        AsideNavComponent,
        FooterComponent,
        QuickSidebarComponent,
        ScrollTopComponent,
        TooltipsComponent,
        HrefPreventDefaultDirective,
        btnloaderDirective,
        LoaddingComponent,
        TimeMaskDirective,
        DateMaskDirective,
        MaBenhNhanDirective,
        NumberTransform
    ],
    imports: [
        CommonModule,
        RouterModule,
    ]
})
export class LayoutModule {
}