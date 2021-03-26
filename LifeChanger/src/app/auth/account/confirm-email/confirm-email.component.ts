import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.sass']
})
export class ConfirmEmailComponent implements OnInit {

  emailConfirmed: boolean = true;
  urlParams: any = {};

  constructor(private route: ActivatedRoute, private authService: AuthService, private alertService: AlertService,
    public progressBar: ProgressBarService) { }

  ngOnInit(): void {
    this.urlParams.token = this.route.snapshot.queryParamMap.get('token');
    this.urlParams.userId = this.route.snapshot.queryParamMap.get('userId');
    this.confirmEmail();
  }
  confirmEmail() {
    this.progressBar.startLoading();
    this.alertService.info('Confirming email');
    this.authService.confirmEmail(this.urlParams).subscribe(() => {
      console.log("succes");
      this.progressBar.completeLoading();
      this.progressBar.setSucces();
      this.alertService.success('Email confirmed');
      this.emailConfirmed = true;
    }, error => {
      console.log(error);
      this.progressBar.completeLoading();
      this.progressBar.setError();
      this.emailConfirmed = false;
      this.alertService.danger('Try again')
    })
  }

}
