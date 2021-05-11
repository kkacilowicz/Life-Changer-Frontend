import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PreferencesService } from 'src/app/shared/services/preferences.service';
import { EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-edit-culture',
  templateUrl: './edit-culture.component.html',
  styleUrls: ['./edit-culture.component.sass']
})
export class EditCultureComponent implements OnInit {

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
  selectedDetails: string[] = [];  // list of selected items
  option1 = "book";
  option2 = "music";
  option3 = "gamer";
  option4 = "party";
  option5 = "arts";
  option6 = "concert";
  option7 = "film";

  ngOnInit(): void {
    this.selectedDetails = new Array<string>();
    this.form = this.fb.group({
      images: [''],
    })
  }

  onSubmit() {
    const detailsObserver = {
      next: x => {
        console.log('Details Culture OK');
        this.eventCulture.emit(this.task);
        this.alertService.success('Sent correctly ');
      },
      error: err => {
        console.log(err);
        this.alertService.danger(err.error.message);
        this.authService.changePage('edit-preferences');
      }
    };
    this.form.patchValue({ images: this.selectedDetails })
    this.Preferences.details(this.form.value).subscribe(detailsObserver);
    this.authService.changePage('/my-profile');
  }

  getDetailId(e: any, id: string) {
    if (e.target.checked) {
      this.selectedDetails.push(id);
    }
    else {
      this.selectedDetails = this.selectedDetails.filter(m => m != id);
    }
    return this.selectedDetails;
  }



}
