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

// import { SocialLoginModule } from 'angularx-social-login'
// import { GoogleLoginProvider } from 'angularx-social-login';
// import { SocialAuthServiceConfig } from 'angularx-social-login';




@NgModule({
  declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent, ConfirmEmailComponent, ChangePasswordComponent, DeleteComponent, ChangeEmailComponent,],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    // SocialLoginModule
  ],
  // providers: [
  //   {
  //     provide: 'SocialAuthServiceConfig',
  //     useValue: {
  //       autoLogin: false,
  //       providers: [
  //         {
  //           id: GoogleLoginProvider.PROVIDER_ID,
  //           provider: new GoogleLoginProvider(
  //             '1024899223351-uhvfele4a4l51n7nd62cjdbe31bfujdc.apps.googleusercontent.com'
  //           )
  //         }
  //       ]
  //     } as SocialAuthServiceConfig,
  //   }
  // ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent
  ]
})
export class AuthModule { }
