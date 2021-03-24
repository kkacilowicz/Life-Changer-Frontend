import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;

  constructor() { }

  ngOnInit(): void {
  }

  signIn() {
    console.log(this.firstName);
    console.log(this.lastName);
    console.log(this.userName);
    console.log(this.email);
    console.log(this.password);
    console.log(this.passwordConfirm);
  }
}
