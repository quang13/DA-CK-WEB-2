import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { LoginComponent } from './pages/login/login.component';
import { RegisterTXComponent } from './pages/dang-ky-taixe/dang-ky-taixe.component';
import { TaiXeCompopent } from './pages/tai-xe/tai-xe.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { HttpClientModule } from '@angular/common/http';
import { MaterialFileUploadComponent } from './material-file-upload/material-file-upload.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { FormDatXeComponent } from './_components/form-dat-xe/form-dat-xe.component';

@NgModule({
  declarations: [
    PagesComponent,
    AppComponent,
    DirectionsMapDirective,
    RegisterKHComponent,
    HomeComponent,
    LoginComponent,
    RegisterTXComponent,
    TaiXeCompopent,
    MaterialFileUploadComponent,
    //FormDatXeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Material.MatButtonModule,
    Material.MatCardModule,
    Material.MatProgressBarModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    MatFileUploadModule,
    AngularFontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhV7whWFFrWG1FToGcs48HfEDBBtjxg8k',
      libraries: ['places'],
    }),
    AgmDirectionModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
})
export class AppModule { }
