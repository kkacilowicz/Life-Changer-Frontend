import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authUrl = "https://localhost:5001/api/Account/";
  userUrl = "https://localhost:5001/api/Account/register";
  confirmEmailUrl = "localhost:5001/api/Account/confirm-email/";
  changePasswordUrl = "localhost:5001/api/Account/change-password/";
  helper = new JwtHelperService();
  token;


  constructor(private http: HttpClient, private router: Router) { }

  login(model: any) {
    console.log(model);
    return this.http.post(this.authUrl + 'login', model).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('token', user.token)
        }
      })
    )
  }
  register(model: any) {
    console.log(model);
    let headers = new HttpHeaders({
      'confirmEmailUrl': this.confirmEmailUrl
    });
    let options = { headers: headers };
    return this.http.post(this.userUrl, model, options)
  }

  resetPassword(model: any) {
    let headers = new HttpHeaders({
      'changePasswordUrl': this.changePasswordUrl
    });
    let options = { headers: headers };
    return this.http.post(this.authUrl + 'resetpassword', model, options)
  }

  confirmEmail(model: any) {
    return this.http.post(this.confirmEmailUrl, model);
  }

  changePassword(model: any) {
    return this.http.post(this.changePasswordUrl, model);
  }

  loggedIn() {
    this.token = localStorage.getItem('token');
    return !this.helper.isTokenExpired(this.token);
  }
  changePage(path: string) {
    this.router.navigateByUrl(path);
  }
}


