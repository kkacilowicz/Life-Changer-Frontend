import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  preUrl: string = environment.preUrl;

  constructor(private http: HttpClient) {
  }


  preferences(model: any) {
    console.log(model);
    return this.http.post(this.preUrl, model)
  }
}
