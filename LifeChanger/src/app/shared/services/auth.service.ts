import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  apiUrl: string = environment.apiUrl;
  changePasswordUrl = this.apiUrl + 'change-password'
  confirmEmailUrl = "localhost:5001/api/Email/confirm/";
  helper = new JwtHelperService();
  token;
  decodedToken: any;
  currentUser: IUser | undefined;



  constructor(private http: HttpClient, private router: Router) { }

  login(model: any) {
    console.log(model);
    return this.http.post(this.apiUrl + 'login', model).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.helper.decodeToken(user.token);
          this.currentUser = user.given_name;

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
    return this.http.post(this.apiUrl + 'register', model, options)
  }

  resetPassword(model: any) {
    let headers = new HttpHeaders({
      'changePasswordUrl': this.changePasswordUrl
    });
    let options = { headers: headers };
    return this.http.post(this.apiUrl + 'resetpassword', model, options)
  }

  confirmEmail(model: any) {
    return this.http.post(this.confirmEmailUrl, model);
  }

  changePassword(model: any) {
    console.log(model);
    return this.http.post(this.changePasswordUrl, model);
  }

  deleteAccount(model: any) {
    console.log(model);
    return this.http.post(this.changePasswordUrl, model); //zmienic end pointa na usuwanie konta
  }


  loggedIn() {
    this.token = localStorage.getItem('token');
    return !this.helper.isTokenExpired(this.token);
  }

  changePage(path: string) {
    this.router.navigateByUrl(path);
  }
}


