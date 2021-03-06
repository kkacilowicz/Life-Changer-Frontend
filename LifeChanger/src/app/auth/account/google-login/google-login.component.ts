import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { AlertService } from 'ngx-alerts';
import { delay } from 'rxjs/operators';

import { AuthService } from 'src/app/shared/services/auth.service';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.sass'],
})
export class GoogleLoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    public authService: AuthService,
    private alertService: AlertService,
    public progressBar: ProgressBarService,
    private socialAuthService: SocialAuthService,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.authService.User = user;
      this.authService.isSignedIn = this.authService.User != null;
    });
  }

  googleLogin() {
    this.socialAuthService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((User) => {
        this.sendToken();
      });
  }

  refreshToken(): void {
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  sendToken() {
    this.authService.sendGoogleToken().subscribe((response) => {
      console.log(`to je od grzegorza`, response);
      localStorage.setItem('token', response.token);
      localStorage.setItem(
        'accessToken',
        this.authService.User.response.access_token
      );
      this.authService.decodedToken = this.authService.helper.decodeToken(
        response.token
      );
      this.alertService.success('User logged in');
      if (localStorage.hasOwnProperty('accessToken')) {
        console.log('ustawiony accessToken');
      }
      delay(2000);
      this.userService.checkPreferences();
    });
  }
}
