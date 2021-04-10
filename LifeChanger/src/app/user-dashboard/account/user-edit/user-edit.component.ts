import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass']
})
export class UserEditComponent implements OnInit {
  model: any = {}; // potem dodac dane do edycji


  constructor(private authService: AuthService, private alertService: AlertService,
    public progressBar: ProgressBarService,
    private userService: UserService) { }

  ngOnInit(): void { }

  onSubmit() {
    this.progressBar.startLoading();
    this.alertService.info('Updating Account');
    const updateUserObserver = {
      next: x => {
        console.log('User logged in');
        this.alertService.success('User logged in');
        this.progressBar.completeLoading();
        this.progressBar.setSucces();
      },
      error: err => {
        console.log(err);
        this.alertService.danger(err.error.message);
        this.progressBar.completeLoading();
        this.progressBar.setError();
      }
    };
    // this.authService.login(f.value).subscribe(updateUserObserver);
  }

}
