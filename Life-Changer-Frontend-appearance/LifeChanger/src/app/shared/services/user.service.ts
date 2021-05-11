import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { userPreferences } from '../models/userPreferences';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = environment.apiUrl;
  preUrl = environment.preUrl;


  userPref: userPreferences = {
    userName!: '',
    categories!: [ ],
  }

  constructor(private httpClient: HttpClient, private router: Router) { }




  getPreferences(): Observable<userPreferences>{
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpClient.get<userPreferences>(this.preUrl + 'UserCategories', { headers: headers })
  }




 preferences():Promise<void>{

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

  changePagePreferences(path: string) {
    this.router.navigateByUrl(path);
  }

  checkPreferences(){
    if(localStorage.getItem('token')){
    this.preferences().then( () =>{
    if (this.userPref.categories.length == 0) {
      this.changePagePreferences('preferences')
    } else {
      this.changePagePreferences('main')
    }
    });
  }
  };



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

