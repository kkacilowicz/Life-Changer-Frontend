import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserEditComponent } from './account/user-edit/user-edit.component';


@NgModule({
  declarations: [UserEditComponent],
  imports: [
    CommonModule,
    UserDashboardRoutingModule
  ],
  exports: [UserEditComponent]
})
export class UserDashboardModule { }
