import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';

import {IUser} from '../../../shared/models/user'

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.sass']
})
export class GoogleLoginComponent implements OnInit {

  User = this.authService.User;
  isSignedIn = this.authService.isSignedIn;

  givenUser!: IUser;

  constructor(public authService: AuthService, private alertService: AlertService, public progressBar: ProgressBarService, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.authService.User = user;
      this.authService.isSignedIn = (this.authService.User != null);
    });
  }


  googleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(User => {
    this.sendToken();
    })
  }

  sendToken(){
    if(this.authService.sendGoogleToken().subscribe()){
      this.authService.changePage('preferences');
    }

  }


  // logout() {
  //   this.socialAuthService.signOut();
  // }




}







