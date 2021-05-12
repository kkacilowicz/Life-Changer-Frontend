import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthService } from '../../../shared/services/auth.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  constructor(public authService: AuthService, public userService: UserService) { }


  userInfo = {
    userName: this.authService.decodedToken.given_name,
    email: this.authService.decodedToken.email
  }

  ngOnInit(): void {

    this.userService.preferences();
    // console.log(this.authService.decodedToken);

  }


}

