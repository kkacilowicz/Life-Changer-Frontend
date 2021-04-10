import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditComponent } from './account/user-edit/user-edit.component';
import {UserProfileComponent} from './account/user-profile/user-profile.component'

const routes: Routes = [
  { path: 'profile-edit', component: UserEditComponent },
  { path: 'my-profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule { }
