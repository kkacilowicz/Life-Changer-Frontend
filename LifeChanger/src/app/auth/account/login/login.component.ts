import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private alertService: AlertService,
    public progressBar: ProgressBarService) { }

  ngOnInit(): void {
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
        this.alertService.danger('Unable to login')
        this.progressBar.completeLoading();
        this.progressBar.setError();
      }
    };
    this.authService.login(f.value).subscribe(loginObserver);
  }
}
