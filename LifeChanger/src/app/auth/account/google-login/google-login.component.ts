import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { AlertService } from 'ngx-alerts';

import { AuthService } from 'src/app/shared/services/auth.service';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { UserService } from 'src/app/shared/services/user.service'


@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.sass']
})
export class GoogleLoginComponent implements OnInit {

  constructor(private userService: UserService, public authService: AuthService, private alertService: AlertService, public progressBar: ProgressBarService, private socialAuthService: SocialAuthService, private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.authService.User = user;
      this.authService.isSignedIn = (this.authService.User != null);
    });

    this.userService.user();
    this.userService.preferences();
  }

  helper = new JwtHelperService();
  decodedToken: any;

  googleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(User => {
      this.sendToken();
      console.log(User);
    })
  }

  refreshToken(): void {
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  sendToken() {
    if (this.authService.sendGoogleToken().subscribe()) {
      localStorage.setItem('accessToken', this.authService.User.response.access_token);

      console.log("Table:", this.userService.userPref.categories)
      console.log("Length:", this.userService.userPref.categories.length)

      if (localStorage.getItem('accessToken')) {
        this.userService.preferences().then(() => {

          if (this.userService.userPref.categories.length == 0) {
            this.authService.changePage('preferences')
          }
          else {
            this.authService.changePage('main')
          }
        });
      }
    }
  }


  // logout() {
  //   this.socialAuthService.signOut();
  // }




}







