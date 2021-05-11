import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { UserDashboardModule } from './user-dashboard/user-dashboard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SocialLoginModule } from 'angularx-social-login'
import { GoogleLoginProvider } from 'angularx-social-login';
import { SocialAuthServiceConfig } from 'angularx-social-login';

import { CalendarComponent } from './pages/calendar/calendar.component';

import { LoveComponent } from './pages/preferences/love/love.component';
import { SportComponent } from './pages/preferences/sport/sport.component';
import { CultureComponent } from './pages/preferences/culture/culture.component';
import { MainComponent } from './pages/main/main.component';
import { SafePipe } from './safe.pipe';
import { LogoutComponent } from './pages/logout/logout.component';



const googleLoginOptions = {
  scope: 'https://www.googleapis.com/auth/calendar',
  access_type: 'offline',
  redirect_uri: ''
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PreferencesComponent,

    CalendarComponent,

    LoveComponent,
    SportComponent,
    CultureComponent,
    MainComponent,
    SafePipe,
    LogoutComponent,
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
    UserDashboardModule,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1024899223351-uhvfele4a4l51n7nd62cjdbe31bfujdc.apps.googleusercontent.com', googleLoginOptions
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    SafePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
