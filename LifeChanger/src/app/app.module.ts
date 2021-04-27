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

import { SocialLoginModule } from 'angularx-social-login'
import { GoogleLoginProvider } from 'angularx-social-login';
import { SocialAuthServiceConfig } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';


import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent } from './pages/calendar/calendar.component';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PreferencesComponent,
    CalendarComponent,
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
    FullCalendarModule
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
              '1024899223351-uhvfele4a4l51n7nd62cjdbe31bfujdc.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
