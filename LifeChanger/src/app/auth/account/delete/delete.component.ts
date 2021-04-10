import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProgressBarService } from 'src/app/shared/services/progress-bar.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService, private alertService: AlertService,
    public progressBar: ProgressBarService) { }

  ngOnInit(): void {
  }

  //dodac usuwanie tokenu
  onSubmit(f: NgForm) {
    this.progressBar.startLoading();
    this.alertService.info('Deleting account');
    const deleteAccountObserver = {
      next: x => {
        this.alertService.success('Account deleted');
        this.progressBar.completeLoading();
        this.progressBar.setSucces();
        localStorage.removeItem('token');
        this.authService.changePage('')
      },
      error: err => {
        this.alertService.danger(err.error.message);
        this.progressBar.completeLoading();
        this.progressBar.setError();
      }
    };
    this.authService.deleteAccount(f.value).subscribe(deleteAccountObserver);
  }
}
