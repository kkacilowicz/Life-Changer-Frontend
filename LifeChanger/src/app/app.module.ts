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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// import { SocialLoginModule, GoogleLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
// import { HttpClientModule } from '@angular/common/http';
// import { DemoComponentComponent } from './demo-component/demo-component.component';

// const config = new SocialAuthServiceConfig([
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider('1024899223351-uhvfele4a4l51n7nd62cjdbe31bfujdc.apps.googleusercontent.com')
//   }
// ]);

// export function provideConfig() {
//   return config;
// }

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PreferencesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
    UserDashboardModule,
    NgbModule,
    // SocialLoginModule,
    // HttpClientModule,
  ],
  // providers: [
  //   {
  //     provide: 'SocialAuthServiceConfig',
  //     useValue: {
  //       // provideConfig
  //       autoLogin: false,
  //       providers: [
  //         {
  //           id: GoogleLoginProvider.PROVIDER_ID,
  //           provider: new GoogleLoginProvider(
  //             '1024899223351-uhvfele4a4l51n7nd62cjdbe31bfujdc.apps.googleusercontent.com'
  //           )
  //         },
  //       ]
  //     } as SocialAuthServiceConfig
  //   }
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
