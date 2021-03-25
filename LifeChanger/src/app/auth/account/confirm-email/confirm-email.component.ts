import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.sass']
})
export class ConfirmEmailComponent implements OnInit {

  emailConfirmed: boolean = true;
  urlParams: any = {};

  constructor(private route: ActivatedRoute, private authService: AuthService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.urlParams.token = this.route.snapshot.queryParamMap.get('token');
    this.urlParams.userId = this.route.snapshot.queryParamMap.get('userId');
    this.confirmEmail();
  }
  confirmEmail() {
    this.alertService.info('Confirming email');
    this.authService.confirmEmail(this.urlParams).subscribe(() => {
      console.log("succes");
      this.alertService.success('Email confirmed');
      this.emailConfirmed = true;
    }, error => {
      console.log(error);
      this.emailConfirmed = false;
      this.alertService.danger('Try again')
    })
  }

}
