import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserEditComponent } from './account/user-edit/user-edit.component';
import { UserProfileComponent } from './account/user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserEditPreferencesComponent } from './account/user-edit-preferences/user-edit-preferences.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserEditComponent, UserProfileComponent, UserEditPreferencesComponent],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

  ],
  exports: [UserEditComponent]
})
export class UserDashboardModule { }
