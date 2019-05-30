import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as Material from "@angular/material";
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SelectCustomComponent } from './select-custom.component';
import { SelectMultipleCustomComponent } from './select-multiple-custom.component';
import { SelectServerSideComponent } from './select-server-side.component';
import { AutocompleteServerSideComponent } from './autocomplete-server-side.component';
import { AutocompleteComponent } from './autocomplete.component';
import {MatSelectInfiniteScrollModule} from 'ng-mat-select-infinite-scroll';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatSelectModule,
    Material.MatButtonModule,
    Material.MatSelectModule,
    Material.MatIconModule,
    Material.MatAutocompleteModule,
    Material.MatProgressBarModule,
    ScrollDispatchModule
  ], exports: [
    SelectCustomComponent,
    SelectServerSideComponent,
    AutocompleteServerSideComponent,
    AutocompleteComponent,
    SelectMultipleCustomComponent
  ], declarations: [
    SelectCustomComponent,
    SelectServerSideComponent,
    AutocompleteServerSideComponent,
    AutocompleteComponent,
    SelectMultipleCustomComponent
  ]
})
export class SelectCustomModule {

}