import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class PreferencesService {
  preUrl: string = environment.preUrl;

  constructor(private http: HttpClient,  private router: Router) {
  }


  preferences(model: any) {

    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    .set('content-type', 'application/json');

    let options = { headers: headers };
    console.log(model);

    return this.http.post(this.preUrl + 'GeneratePreferences' , model,options);
  }


  details(model: any) {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    .set('content-type', 'application/json');

    let options = { headers: headers };
    console.log(model);
    return this.http.post(this.preUrl + 'LikedPreferences', model,options);
  }

  
  deletePreferences(model: any ) {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    
    let options = { headers: headers };
    return this.http.delete(this.preUrl + 'UserCategories', model);
  }

}
