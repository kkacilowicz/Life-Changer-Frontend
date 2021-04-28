import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PreferencesService } from 'src/app/shared/services/preferences.service';
import { EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-ed-love',
  templateUrl: './ed-love.component.html',
  styleUrls: ['./ed-love.component.sass']
})
export class EdLoveComponent implements OnInit {

  loveImages = ['../../../assets/Images/Preferences/love/jedzenie.jpg', '../../../assets/Images/Preferences/love/rzezba.jpg',
    '../../../assets/Images/Preferences/love/kino.jpg', '../../../assets/Images/Preferences/love/film.jpg',
    '../../../assets/Images/Preferences/love/rower.jpg', '../../../assets/Images/Preferences/love/spacer.jpg',]


  task = true
  buttonClick!: boolean

  @Input()
  preferencesList;


  @Output()
  eventLove = new EventEmitter<boolean>();

  constructor(
    private alertService: AlertService,
    public authService: AuthService,
    public Preferences: PreferencesService,
    public fb: FormBuilder
  ) { }


  form!: FormGroup;   // form 
  selectedDetails: string[] = [];  // list of selected items
  option1 = "food";
  option2 = "monument";
  option3 = "cienema";
  option4 = "couple film";
  option5 = "couple staff";
  option6 = "walking couple";

  ngOnInit(): void {
    this.selectedDetails = new Array<string>();
    this.form = this.fb.group({
      images: [''],
    })
    this.buttonClick = false
  }

  onSubmit() {
    const detailsObserver = {
      next: x => {
        console.log('Details love OK');
        this.buttonClick = true
        if (this.preferencesList[0] == true && this.preferencesList[1] == false && this.preferencesList[2] == false) {
          this.authService.changePage('')
        }
        this.alertService.success('Sent correctly ');
      },
      error: err => {
        console.log(err);
        this.alertService.danger(err.error.message);
      }

    };


    this.eventLove.emit(this.task)
    this.form.patchValue({ images: this.selectedDetails })
    this.Preferences.details(this.form.value).subscribe(detailsObserver);


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
