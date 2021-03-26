import { Component, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { AlertService } from 'ngx-alerts';
import { AuthService } from '../../services/auth.service';
import { ProgressBarService } from '../../services/progress-bar.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private alertService: AlertService, private progress: NgProgress, public progressBar: ProgressBarService) { }

  ngOnInit(): void {
    this.progressBar.progressRef = this.progress.ref("progressBar")
  }

  logout() {
    localStorage.removeItem('token');
    this.alertService.success("Logged Out");
    this.authService.changePage('')
  }
}
