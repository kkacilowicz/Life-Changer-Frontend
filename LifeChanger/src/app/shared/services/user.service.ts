import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { IUser } from './../models/user'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = environment.apiUrl;

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
    return this.httpClient.get<IUser>(this.userUrl + 'userinfo', { headers: headers })
  }

  user() {
    this.getUser().subscribe((data: IUser) => this.userInfo = {
      email: (data as any).email,
      userName: (data as any).userName,
      phoneNumber: (data as any).phoneNumber,
      gender: (data as any).gender,
      birthDate: (data as any).birthDate,
    });
  }

  updateUser(model: any) {
    console.log(model);
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
      .set('content-type', 'application/json-patch+json');
    let options = { headers: headers };
    return this.httpClient.patch(this.userUrl + 'updateuser', model, options).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    )
  }
}

