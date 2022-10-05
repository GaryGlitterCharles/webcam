import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {WebcamModule} from 'ngx-webcam';
import { NewcamComponent } from './newcam/newcam.component';
import { OldcamComponent } from './oldcam/oldcam.component';
@NgModule({
  declarations: [
    AppComponent,
    NewcamComponent,
    OldcamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
