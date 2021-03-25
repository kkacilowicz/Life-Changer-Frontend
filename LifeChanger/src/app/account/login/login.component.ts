import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  userEmail: string;
  userPassword: string;

  constructor() { }
  ngOnInit(): void {
  }

  logIn() {
    console.log(this.userEmail);
    console.log(this.userPassword);
  }

}
