import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserProfileComponent } from './account/user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserEditPreferencesComponent } from './account/user-edit-preferences/user-edit-preferences.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EditLoveComponent } from './account/user-edit-preferences/edit-love/edit-love.component';
import { EditSportComponent } from './account/user-edit-preferences/edit-sport/edit-sport.component';
import { EditCultureComponent } from './account/user-edit-preferences/edit-culture/edit-culture.component';
import { UserCalendarComponent } from './user-calendar/user-calendar.component';


@NgModule({
  declarations: [ UserProfileComponent, UserEditPreferencesComponent, EditLoveComponent, EditSportComponent, EditCultureComponent, UserCalendarComponent],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

  ],
 
})
export class UserDashboardModule { }
