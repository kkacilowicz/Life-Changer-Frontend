import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  apiUrl: string = environment.apiUrl;
  // changePasswordUrl = this.apiUrl + 'changepassword'
  // confirmEmailUrl = "localhost:5001/api/Email/confirm";
  // helper = new JwtHelperService();
  // token;
  decodedToken: any;

  User!: SocialUser;
  isSignedIn!: boolean;

  constructor(private http: HttpClient, private router: Router) { }

  loggedIn(){
    return this.isSignedIn;
  }

  changePage(path: string) {
    this.router.navigateByUrl(path);
  }

  sendGoogleToken(){
    return this.http.post(this.apiUrl ,this.User.authToken);
  }
}



// loggedIn() {
//   this.token = localStorage.getItem('token');

//   return !this.helper.isTokenExpired(this.token);
// }


// login(model: any) {
//   console.log(model);
//   return this.http.post(this.apiUrl + 'login', model).pipe(
//     map((user: any) => {
//       if (user) {
//         localStorage.setItem('token', user.token);
//         this.decodedToken = this.helper.decodeToken(user.token);
//       }
//     })
//   )
// }
// register(model: any) {
//   console.log(model);
//   let headers = new HttpHeaders({
//     'confirmEmailUrl': this.confirmEmailUrl
//   });
//   let options = { headers: headers };
//   return this.http.post(this.apiUrl + 'register', model, options)
// }

// resetPassword(model: any) {
//   console.log(model);
//   let headers = new HttpHeaders({
//     'changePasswordUrl': this.changePasswordUrl
//   });
//   let options = { headers: headers };
//   return this.http.post(this.apiUrl + 'resetpassword', model, options)
// }

// confirmEmail() {
//   const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
//   return this.http.post(this.confirmEmailUrl, headers);
// }

// changePassword(model: any) {
//   console.log(model);
//   let headers = new HttpHeaders({
//     'Authorization': `Bearer ${localStorage.getItem('token')}`
//   });
//   let options = { headers: headers };
//   return this.http.put(this.changePasswordUrl, model, options);
// }
// changeEmail(model: any) {
//   console.log(model);
//   let headers = new HttpHeaders({
//     'Authorization': `Bearer ${localStorage.getItem('token')}`
//   });
//   let options = { headers: headers };
//   return this.http.put(this.apiUrl + 'changeemail', model, options);
// }

// deleteAccount() {
//   let headers = new HttpHeaders({
//     'Authorization': `Bearer ${localStorage.getItem('token')}`
//   });
//   let options = { headers: headers };
//   return this.http.delete(this.apiUrl, options);
// }
