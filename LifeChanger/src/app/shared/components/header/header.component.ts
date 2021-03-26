import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('token');
    this.alertService.success("Logged Out");
  }
}
