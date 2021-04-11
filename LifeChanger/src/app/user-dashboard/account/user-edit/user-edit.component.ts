import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { IUser } from 'src/app/shared/models/user';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass']
})
export class UserEditComponent implements OnInit {
  model: any = {}; // potem dodac dane do edycji

  userInfo: IUser | undefined;

  constructor(private alertService: AlertService,
    public progressBar: ProgressBarService,
    public userService: UserService) { }

  ngOnInit(): void {
    this.userService.user();
  }


  onSubmit(f: NgForm) {
    this.progressBar.startLoading();
    this.alertService.info('Updating Account');
    const updateUserObserver = {
      next: x => {
        this.alertService.success('Profile updated');
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
    // this.userService.update(f.value).subscribe(updateUserObserver);
  }
}
