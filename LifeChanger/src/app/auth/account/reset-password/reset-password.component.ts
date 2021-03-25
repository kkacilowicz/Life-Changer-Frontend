import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService: AuthService, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.alertService.info('Reseting password');
    const resetPasswordObserver = {
      next: x => {
        console.log('check email to change the password'),
          this.alertService.success('Check email to change the password');
      },
      error: err => {
        console.log(err);
        this.alertService.danger('Something went wrong')
      }
    };
    this.authService.resetPassword(f.value).subscribe(resetPasswordObserver);
  }
}
