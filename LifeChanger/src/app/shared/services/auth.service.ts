import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = "localhost:5001/api/account/testauth/";
  userUrl = "localhost:5001/api/account/register/";
  confirmEmailUrl = "localhost:5001/api/account/confirm-email/";
  changePasswordUrl = "localhost:5001/api/account/change-password/"

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.authUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user.result.succeded) {
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
    return this.http.post(this.userUrl + 'create', model, options)
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
}


