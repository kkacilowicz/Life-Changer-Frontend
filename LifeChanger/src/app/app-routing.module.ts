import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { HomeComponent } from './pages/home/home.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { MainComponent} from './pages/main/main.component'
import { LogoutComponent} from './pages/logout/logout.component'
import { LoadingComponent} from './pages/loading/loading.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'main', component: MainComponent },
  { path: 'loading', component: LoadingComponent},
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
