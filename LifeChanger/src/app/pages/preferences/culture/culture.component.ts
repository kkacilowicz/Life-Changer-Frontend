import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PreferencesService } from 'src/app/shared/services/preferences.service';
import { EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-culture',
  templateUrl: './culture.component.html',
  styleUrls: ['./culture.component.sass']
})
export class CultureComponent implements OnInit {

  cultureImage = ['../../../assets/Images/Preferences/culture/film.jpg','../../../assets/Images/Preferences/culture/gry.jpg',
                  '../../../assets/Images/Preferences/culture/impreza.jpg','../../../assets/Images/Preferences/culture/koncert.jpg',
                  '../../../assets/Images/Preferences/culture/ksiazka.jpg','../../../assets/Images/Preferences/culture/sluchawki.jpg',
                  '../../../assets/Images/Preferences/culture/teatr.jpg',
                  ]             

  task = true



  @Input()
  preferencesList;


  @Output()
  eventCulture = new EventEmitter<boolean>();

  constructor(
    private alertService: AlertService,
    public authService: AuthService,
    public Preferences: PreferencesService, 
    public fb: FormBuilder
  ) { }

  form!: FormGroup;   // form 
  selectedDetails: number[] = [];  // list of selected items
  option1 = 9;
  option2 = 10;
  option3 = 11;
  option4 = 13;
  option5 = 14;
  option6 = 15;
  option7 = 16;

  ngOnInit(): void {
    this.selectedDetails = new Array<number>();
    this.form = this.fb.group({
      categories: [''],
    })
  }

  onSubmit() {
    const detailsObserver = {
      next: x => {
        console.log('Details Culture OK');
        this.authService.changePage('')
        this.alertService.success('Sent correctly ');
      },
      error: err => {
        console.log(err);
        this.alertService.danger(err.error.message);
      }
    };

    this.eventCulture.emit(this.task);
    this.form.patchValue({ categories: this.selectedDetails })
    this.Preferences.details(this.form.value).subscribe(detailsObserver);
    
  }

  getDetailId(e: any, id: number) {
    if (e.target.checked) {
      this.selectedDetails.push(id);
    }
    else {
      this.selectedDetails = this.selectedDetails.filter(m => m != id);
    }
    return this.selectedDetails;
  }


}
