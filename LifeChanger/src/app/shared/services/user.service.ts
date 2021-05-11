import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { IUser } from './../models/user'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { userPreferences } from '../models/userPreferences';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = environment.apiUrl;
  preUrl = environment.preUrl;

  userInfo: IUser = {
    email: '',
    userName: '',
    gender: '',
    birthDate: '',
    phoneNumber: '',
  }

  userPref: userPreferences = {
    userName!: '',
    categories!: [ ],
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

  async equals(){
    const promise = await new Promise((resolve) =>{
      setTimeout(()=>resolve('finished'), 1000)
    });
    let category = this.userPref.categories[0]
    let category1 = this.userPref.categories[1]
    let category2 = this.userPref.categories[2]
    if ( category.name =='' && category1.name =='' && category2.name ==''  ){
      console.log("c0", category.name)
      console.log("c1",category1.name)
      console.log("c2",category2.name)
      return true
    }
    else{
      return false 
    }
  }

  getPreferences(): Observable<userPreferences>{
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpClient.get<userPreferences>(this.preUrl + 'UserCategories', { headers: headers })
  }

 preferences():Promise<void>{
    // this.getPreferences().subscribe((data: userPreferences)=> this.userPref ={
    //   userName : (data as any ).userName,
    //   categories: (data as any).categories,     
    // });

    let resolveRef;
    let rejectRef;

    //create a new promise. Save the resolve and reject reference
    let dataPromise: Promise<void> = new Promise((resolve, reject) => {
        resolveRef = resolve;
        rejectRef = reject;
    });

    this.getPreferences()
    .subscribe( (data: userPreferences) => {
          this.userPref = {
        userName : (data as any ).userName,
        categories: (data as any).categories,  
        };
     resolveRef(null);
    });
    

     return dataPromise

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

