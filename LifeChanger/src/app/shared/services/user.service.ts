import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { IUser } from './../models/user'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = environment.apiUrl + 'userinfo';

  userInfo: IUser = {
    email: '',
    userName: '',
    gender: '',
    birthDate: '',
    phoneNumber: '',
  }
  constructor(private httpClient: HttpClient, private authService: AuthService) { }


  getUser(): Observable<IUser> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpClient.get<IUser>(this.userUrl, { headers: headers })
  }


  // .pipe(
  //   map((user: IUser) => {
  //     if (user) {
  //       console.log(user);
  //     }
  //     return user;
  //   })
  // )

  user() {
    this.getUser().subscribe((data: IUser) => this.userInfo = {
      email: (data as any).email,
      userName: (data as any).userName,
      phoneNumber: (data as any).phoneNumber,
      gender: (data as any).gender,
      birthDate: (data as any).birthDate,
    });
  }
}


