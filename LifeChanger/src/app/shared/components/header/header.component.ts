import { Component, OnInit } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { AlertService } from 'ngx-alerts';
import { AuthService } from '../../services/auth.service';
import { ProgressBarService } from '../../services/progress-bar.service';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private alertService: AlertService, private progress: NgProgress, public progressBar: ProgressBarService, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.progressBar.progressRef = this.progress.ref("progressBar")
  }

  // logout(){
  //   this.socialAuthService.signOut();
  //   if(this.socialAuthService.signOut()){
  //     this.authService.changePage('');
  //   }
  // }
  logout() {
  this.socialAuthService.signOut();
  localStorage.removeItem('token');
  localStorage.removeItem('accessToken');
  this.authService.decodedToken = null;
  this.alertService.success("Logged Out");
  this.authService.changePage('logout')
}

routePage(){

  let url:string = this.authService.loggedIn()? 'main': ''
  this.authService.changePage(url);
}

}

