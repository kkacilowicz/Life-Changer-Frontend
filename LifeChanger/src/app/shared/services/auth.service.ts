import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authUrl = "https://localhost:5001/api/Account/";
  userUrl = "https://localhost:5001/api/Account/";
  confirmEmailUrl = "localhost:5001/api/Account/confirm-email/";
  changePasswordUrl = "localhost:5001/api/Account/change-password/";
  helper = new JwtHelperService();
  token;

  constructor(private http: HttpClient) { }

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
    let headers = new HttpHeaders({
      'confirmEmailUrl': this.confirmEmailUrl
    });
    let options = { headers: headers };
    return this.http.post(this.userUrl + 'register', model, options)
  }

  resetPassword(model: any) {
    let headers = new HttpHeaders({
      'changePasswordUrl': this.changePasswordUrl
    });
    let options = { headers: headers };
    return this.http.post(this.authUrl + 'resetpassword', model, options)
  }

  confirmEmail(model: any) {
    return this.http.post(this.authUrl + "confirmemail", model); // dodac koncowke urla confirmmail
  }

  changePassword(model: any) {
    return this.http.post(this.authUrl + "changepassword", model); // dodac koncowke urla confirmmail
  }

  loggedIn() {
    this.token = localStorage.getItem('token');
    return !this.helper.isTokenExpired(this.token);
  }
}


