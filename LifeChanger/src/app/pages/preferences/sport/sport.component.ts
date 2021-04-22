import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PreferencesService } from 'src/app/shared/services/preferences.service';
import { EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.sass']
})
export class SportComponent implements OnInit {


  sportImage = ['../../../assets/Images/Preferences/sport/basen.jpg','../../../assets/Images/Preferences/sport/aerobik.jpg',
  '../../../assets/Images/Preferences/sport/relaks.jpg','../../../assets/Images/Preferences/sport/rower.jpg',
  '../../../assets/Images/Preferences/sport/spacer.jpg','../../../assets/Images/Preferences/sport/nordic.jpg',
  '../../../assets/Images/Preferences/sport/rolki.jpg','../../../assets/Images/Preferences/sport/bieg.jpg',
  '../../../assets/Images/Preferences/sport/silownia.jpg',]

  task = true
  buttonClick!: boolean

  @Input()
  preferencesList;
  

  @Output()
  eventSport = new EventEmitter<boolean>();

  constructor(
    private alertService: AlertService,
    public Preferences: PreferencesService, 
    public fb: FormBuilder,
    public authService: AuthService,
    ) { }

  form!: FormGroup;   // form 
  selectedDetails: number[] = [];  // list of selected items
  option1 = 2;
  option2 = 3;
  option3 = 4;
  option4 = 5;
  option5 = 6;
  option6 = 7;
  option7 = 8;
  option8 = 26;
  option9 = 27;


  ngOnInit(): void {
    this.selectedDetails = new Array<number>();
    this.form = this.fb.group({
      categories: [''],
    })
    this.buttonClick=false
  }

  onSubmit() {
    const detailsObserver = {
      next: x => {
        console.log('Details Sport OK');
        this.eventSport.emit(this.task);
        this.buttonClick=true
        if(this.preferencesList[1]==true && this.preferencesList[2]==false){
          this.authService.changePage('')
        }
        this.alertService.success('Sent correctly ');
      },
      error: err => {
        console.log(err);
        this.alertService.danger(err.error.message);
      }
    };
    this.eventSport.emit(this.task);
    this.form.patchValue({ categories: this.selectedDetails })
    console.log(this.selectedDetails)
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
