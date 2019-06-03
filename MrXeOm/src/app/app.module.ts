import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { DirectionsMapDirective } from './map/google-map.directive';
import * as Material from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layouts/layout.module';
import { PagesComponent } from './pages/pages.component';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { RegisterKHComponent } from './pages/dang-ky-member/dang-ky-member.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    PagesComponent,
    AppComponent,
    DirectionsMapDirective,
    RegisterKHComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Material.MatButtonModule,
    BrowserAnimationsModule,
    LayoutModule,
    PagesRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhV7whWFFrWG1FToGcs48HfEDBBtjxg8k',
      libraries: ['places'],
    }),
    AgmDirectionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
