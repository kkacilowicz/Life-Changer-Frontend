import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { GoogleLoginComponent } from './account/google-login/google-login.component';



@NgModule({
  declarations: [GoogleLoginComponent,],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
  ],
  exports: [
    GoogleLoginComponent,
  ]
})
export class AuthModule { }
