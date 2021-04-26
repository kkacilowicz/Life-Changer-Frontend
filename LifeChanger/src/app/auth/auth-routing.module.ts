import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { ConfirmEmailComponent } from './account/confirm-email/confirm-email.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { DeleteComponent } from './account/delete/delete.component';
import { ChangeEmailComponent } from './account/change-email/change-email.component';
import { GoogleLoginComponent } from './account/google-login/google-login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'delete-account', component: DeleteComponent },
  { path: 'change-email', component: ChangeEmailComponent },
  { path: 'googlelogin', component: GoogleLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
