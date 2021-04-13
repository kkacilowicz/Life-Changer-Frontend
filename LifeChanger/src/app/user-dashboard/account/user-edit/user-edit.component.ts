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
  model: { op: string, path: string, value: string }[] = [];
  userInfo: IUser | undefined;

  constructor(private alertService: AlertService,
    public progressBar: ProgressBarService,
    public userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.user();
  }

  // checkGender() {
  //   return (this.userService.userInfo.gender == 'male') ? false : true;
  // }


  onChange(e) {
    if (e.target.value.length !== 0) {
      switch (e.target.name) {
        case "userName": {
          if ("userName" !== this.userService.userInfo.userName) {
            this.model.splice(0, 1, { op: 'replace', path: `/${e.target.name}`, value: e.target.value });
          }
          break;
        }
        case "phoneNumber": {
          if ("phoneNumber" !== this.userService.userInfo.phoneNumber) {
            this.model.splice(1, 1, { op: 'replace', path: `/${e.target.name}`, value: e.target.value });
          }
          break;
        }
        case "gender": {
          if ("gender" !== this.userService.userInfo.gender) {
            this.model.splice(2, 1, { op: 'replace', path: `/${e.target.name}`, value: e.target.value });
          }
          break;
        }
      }
    }
    console.log(this.model);
  }

  Submit() {
    console.log(this.model);
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
    this.userService.updateUser(this.model).subscribe(updateUserObserver);
  }

}
