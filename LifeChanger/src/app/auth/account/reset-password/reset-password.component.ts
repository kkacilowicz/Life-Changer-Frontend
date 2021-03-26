import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService: AuthService, private alertService: AlertService,
    public progressBar: ProgressBarService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.progressBar.startLoading();
    this.alertService.info('Reseting password');
    const resetPasswordObserver = {
      next: x => {
        console.log('check email to change the password'),
          this.alertService.success('Check email to change the password');
        this.progressBar.completeLoading();
        this.progressBar.setSucces();
      },
      error: err => {
        console.log(err);
        this.alertService.danger('Something went wrong')
        this.progressBar.completeLoading();
        this.progressBar.setError();
      }
    };
    this.authService.resetPassword(f.value).subscribe(resetPasswordObserver);
  }
}
