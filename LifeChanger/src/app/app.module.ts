import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { UserDashboardModule } from './user-dashboard/user-dashboard.module';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoveComponent } from './pages/preferences/love/love.component';
import { SportComponent } from './pages/preferences/sport/sport.component';
import { CultureComponent } from './pages/preferences/culture/culture.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PreferencesComponent,
    LoveComponent,
    SportComponent,
    CultureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
    UserDashboardModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
