import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/preferences/details/details.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'details', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
