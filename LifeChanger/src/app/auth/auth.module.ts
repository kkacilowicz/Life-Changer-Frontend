import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmEmailComponent } from './account/confirm-email/confirm-email.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { DeleteComponent } from './account/delete/delete.component';
import { ChangeEmailComponent } from './account/change-email/change-email.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent, ConfirmEmailComponent, ChangePasswordComponent, DeleteComponent, ChangeEmailComponent,],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent
  ]
})
export class AuthModule { }
