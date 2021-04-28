import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserEditComponent } from './account/user-edit/user-edit.component';
import { UserProfileComponent } from './account/user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserEditPreferencesComponent } from './account/user-edit-preferences/user-edit-preferences.component';
import { EdLoveComponent } from './account/user-edit-preferences/ed-love/ed-love.component';
import { EdSportComponent } from './account/user-edit-preferences/ed-sport/ed-sport.component';
import { EdCultureComponent } from './account/user-edit-preferences/ed-culture/ed-culture.component'


@NgModule({
  declarations: [UserEditComponent, UserProfileComponent, UserEditPreferencesComponent, EdLoveComponent, EdSportComponent, EdCultureComponent],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  exports: [UserEditComponent]
})
export class UserDashboardModule { }
