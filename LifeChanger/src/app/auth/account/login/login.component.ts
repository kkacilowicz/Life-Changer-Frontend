import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.alertService.info('Checking user info');
    const loginObserver = {
      next: x => {
        console.log('User logged in');
        this.alertService.success('User logged in');
        this.router.navigateByUrl('/preferences');
      },
      error: err => {
        console.log(err);
        this.alertService.danger('Unable to login')
      }
    };
    this.authService.login(f.value).subscribe(loginObserver);
  }
}
