import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  helper = new JwtHelperService();

  constructor(private authService: AuthService) { }
  ngOnInit() {
    // const token = localStorage.getItem('token')!;
    // if (token) {
    //   this.authService.decodedToken = this.helper.decodeToken(token);
    // }

    //jak cos to nie działa,
    // bo probowalem dekodowac token google ale teraz nwm czy to potrzebne czy tez bd poprostu dekodował od grześka tokena
    const token = localStorage.getItem('socialToken')!;
    if (token) {
      this.authService.decodedToken = this.helper.decodeToken(token);
    }
  }

}
