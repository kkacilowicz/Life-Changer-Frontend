import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleLoginComponent } from './account/google-login/google-login.component';

const routes: Routes = [
  { path: 'googlelogin', component: GoogleLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
