import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.sass']
})


export class PreferencesComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    const preferencesObserver = {
      next: x => {
        console.log('Preferences OK');
      },
      error: err => {
        console.log(err);
      }
    };
    this.authService.preferences(f.value).subscribe(preferencesObserver);
  }


}
