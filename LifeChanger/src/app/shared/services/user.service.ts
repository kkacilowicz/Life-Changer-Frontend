import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = "localhost:5001/api/";
  constructor(private http: HttpClient, private authService: AuthService) { }
}

