import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.sass']
})
export class ConfirmEmailComponent implements OnInit {

  emailConfirmed: boolean = true;
  urlParams: any = {};

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.urlParams.token = this.route.snapshot.queryParamMap.get('token');
    this.urlParams.userId = this.route.snapshot.queryParamMap.get('userId');
    this.confirmEmail();
  }
  confirmEmail() {
    this.authService.confirmEmail(this.urlParams).subscribe(() => {
      console.log("succes");
      this.emailConfirmed = true;
    }, error => {
      console.log(error);
      this.emailConfirmed = false;
    })
  }

}
