import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private HttpClient: HttpClient) { }

  // Wysylanie na serwer
  login() {
    console.log("logging in");

  }
  register() {
    console.log("signing in");
  }
}
