import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditPreferencesComponent } from './account/user-edit-preferences/user-edit-preferences.component';
import { UserProfileComponent } from './account/user-profile/user-profile.component'
import { UserCalendarComponent } from './user-calendar/user-calendar.component';

const routes: Routes = [
  { path: 'my-profile', component: UserProfileComponent },
  { path: 'edit-preferences', component: UserEditPreferencesComponent },
  { path: 'edit-calendar', component: UserCalendarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule { }
