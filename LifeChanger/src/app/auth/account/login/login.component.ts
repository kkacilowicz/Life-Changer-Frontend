import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';

import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { GoogleActionsService } from 'src/app/shared/services/google-actions.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  // User = this.googleService.user;
  // isSignedIn = this.googleService.isSignedIn;

  User!: SocialUser;
  isSignedIn!: boolean;

  constructor(private authService: AuthService, private alertService: AlertService, public progressBar: ProgressBarService, private socialAuthService: SocialAuthService, public googleService: GoogleActionsService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.User = user;
      this.isSignedIn = (this.User != null);
      console.log(this.User);
    });
  }

  googleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(User => {
      localStorage.setItem('socialToken', User.authToken);
      console.log(User);
    })
  }

  logout() {
    this.socialAuthService.signOut();
  }

  onSubmit(f: NgForm) {
    this.progressBar.startLoading();
    this.alertService.info('Checking user info');
    const loginObserver = {
      next: x => {
        console.log('User logged in');
        this.alertService.success('User logged in');
        this.progressBar.completeLoading();
        this.progressBar.setSucces();
        this.authService.changePage('preferences');
      },
      error: err => {
        console.log(err);
        this.alertService.danger(err.error.message);
        this.progressBar.completeLoading();
        this.progressBar.setError();
      }
    };
    this.authService.login(f.value).subscribe(loginObserver);
  }
}
