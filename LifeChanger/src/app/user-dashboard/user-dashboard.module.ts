import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserEditComponent } from './account/user-edit/user-edit.component';
import { UserProfileComponent } from './account/user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserEditPreferencesComponent } from './account/user-edit-preferences/user-edit-preferences.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EditLoveComponent } from './account/user-edit-preferences/edit-love/edit-love.component';
import { EditSportComponent } from './account/user-edit-preferences/edit-sport/edit-sport.component';
import { EditCultureComponent } from './account/user-edit-preferences/edit-culture/edit-culture.component';


@NgModule({
  declarations: [UserEditComponent, UserProfileComponent, UserEditPreferencesComponent, EditLoveComponent, EditSportComponent, EditCultureComponent],
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
