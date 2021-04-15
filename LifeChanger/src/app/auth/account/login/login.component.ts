import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  user!: SocialUser;
  loggedIn!: boolean;

  constructor(private authService: AuthService, private alertService: AlertService,
    public progressBar: ProgressBarService, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
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

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.socialAuthService.signOut();
  }

}
