import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserEditComponent } from './account/user-edit/user-edit.component';
import { UserProfileComponent } from './account/user-profile/user-profile.component';


@NgModule({
  declarations: [UserEditComponent, UserProfileComponent],
  imports: [
    CommonModule,
    UserDashboardRoutingModule
  ],
  exports: [UserEditComponent]
})
export class UserDashboardModule { }
