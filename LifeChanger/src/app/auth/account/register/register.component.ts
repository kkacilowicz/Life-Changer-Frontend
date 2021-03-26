import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private alertService: AlertService,
    public progressBar: ProgressBarService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.progressBar.startLoading();
    this.alertService.info('Creating new account');
    const registerObserver = {
      next: x => {
        console.log('User created');
        this.alertService.success('User logged in');
        this.progressBar.completeLoading();
        this.progressBar.setSucces();
      },
      error: err => {
        console.log(err);
        this.alertService.danger(err.error.errors[0].description);
        this.progressBar.completeLoading();
        this.progressBar.setError();
      }
    };
    this.authService.register(f.value).subscribe(registerObserver);
  }
}
