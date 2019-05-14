import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { DirectionsMapDirective } from './map/google-map.directive';
@NgModule({
  declarations: [
    AppComponent,
    DirectionsMapDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
