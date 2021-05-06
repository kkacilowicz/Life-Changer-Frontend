import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';
import { UserService } from 'src/app/shared/services/user.service'

import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {



  helper = new JwtHelperService();

  constructor(private authService: AuthService, private alertService: AlertService,
    private userService: UserService,
    public progressBar: ProgressBarService) { }


  ngOnInit(): void {

  }
//   onSubmit(f: NgForm) {
//     this.progressBar.startLoading();
//     this.alertService.info('Checking user info');
//     const loginObserver = {
//       next: x => {
//         console.log('User logged in');
//         this.alertService.success('User logged in');
//         this.progressBar.completeLoading();
//         this.progressBar.setSucces();
//         if (this.userService.userPref.categories.length == 0) {
//           this.authService.changePage('preferences');
//         }
//         else {
//           this.authService.changePage('');
//         }
//       },
//       error: err => {
//         console.log(err);
//         this.alertService.danger(err.error.message);
//         this.progressBar.completeLoading();
//         this.progressBar.setError();
//       }
//     };
//     this.authService.login(f.value).subscribe(loginObserver);

//   }

}




// onSubmit(f: NgForm) {
//   this.progressBar.startLoading();
//   this.alertService.info('Checking user info');
//   const loginObserver = {
//     next: x => {
//       console.log('User logged in');
//       this.alertService.success('User logged in');
//       this.progressBar.completeLoading();
//       this.progressBar.setSucces();
//       this.authService.changePage('preferences');
//     },
//     error: err => {
//       console.log(err);
//       this.alertService.danger(err.error.message);
//       this.progressBar.completeLoading();
//       this.progressBar.setError();
//     }
//   };
//   this.authService.login(f.value).subscribe(loginObserver);
// }
