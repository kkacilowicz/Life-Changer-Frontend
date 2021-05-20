import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/shared/services/user.service';

import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  helper = new JwtHelperService();
  serverToken;
  decodedToken: any;

  sendObj = {
    token: 'string',
    provider: 'string',
  };

  User!: SocialUser;
  isSignedIn!: boolean;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router
  ) {}

  changePage(path: string) {
    this.router.navigateByUrl(path);
  }

  sendGoogleToken(): Observable<any> {
    this.sendObj.token = this.User.idToken;
    this.sendObj.provider = this.User.provider;
    return this.http.post(this.apiUrl + 'ExternalLogin', this.sendObj);
  }

  loggedIn() {
    this.serverToken = localStorage.getItem('token');

    return !this.helper.isTokenExpired(this.serverToken);
  }
}
