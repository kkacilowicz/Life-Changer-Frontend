import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.sass']
})
export class ChangeEmailComponent implements OnInit {

  model: any = {};
  constructor(private route: ActivatedRoute, private authService: AuthService, private alertService: AlertService,
    public progressBar: ProgressBarService) { }

  ngOnInit(): void {
  }



}



// modifyEmail() {
//   this.progressBar.startLoading();
//   this.alertService.info('Changing email');
//   this.authService.changeEmail(this.model).subscribe(() => {
//     console.log("succes");
//     this.progressBar.completeLoading();
//     this.progressBar.setSucces();
//     this.alertService.success('Email changed');
//   }, error => {
//     console.log(error);
//     this.alertService.danger(error.message);
//     this.progressBar.completeLoading();
//     this.progressBar.setError();
//   })
// }
