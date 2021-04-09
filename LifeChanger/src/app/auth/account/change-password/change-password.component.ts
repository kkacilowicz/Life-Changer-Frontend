import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent implements OnInit {

  model: any = {};
  constructor(private route: ActivatedRoute, private authService: AuthService, private alertService: AlertService,
    public progressBar: ProgressBarService) { }

  ngOnInit(): void {
    this.model.token = this.route.snapshot.queryParamMap.get('token');
    this.model.userId = this.route.snapshot.queryParamMap.get('userId');
  }


  changePassword() {
    this.progressBar.startLoading();
    this.alertService.info('Changing password');
    this.authService.changePassword(this.model).subscribe(() => {
      console.log("succes");
      this.progressBar.completeLoading();
      this.progressBar.setSucces();
      this.alertService.success('Password changed');
    }, error => {
      console.log(error);
      this.alertService.danger(error.message);
      this.progressBar.completeLoading();
      this.progressBar.setError();
    })
  }
}
