import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PreferencesService } from 'src/app/shared/services/preferences.service';
import { EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-edit-sport',
  templateUrl: './edit-sport.component.html',
  styleUrls: ['./edit-sport.component.sass']
})
export class EditSportComponent implements OnInit {

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
  selectedDetails: string[] = [];  // list of selected items
  option1 = "aerobics";
  option2 = "swimming";
  option3 = "bike";
  option4 = "nordic-walking";
  option5 = "walking";
  option6 = "roller skates";
  option7 = "run";
  option8 = "gym";
  option9 = "relax";


  ngOnInit(): void {
    this.selectedDetails = new Array<string>();
    this.form = this.fb.group({
      images: [''],
    })
    this.buttonClick=false
  }

  onSubmit() {
    const detailsObserver = {
      
      next: x => {
        console.log('Details Sport OK');
        this.alertService.success('Sent correctly ');
        
        
      },
      error: err => {
        console.log(err);
        this.alertService.danger(err.error.message);
        this.authService.changePage('edit-preferences')
      }
    };
    this.buttonClick=true
    this.eventSport.emit(this.task);
    this.form.patchValue({ images: this.selectedDetails })
    console.log(this.selectedDetails)
    this.Preferences.details(this.form.value).subscribe(detailsObserver);
    if(this.preferencesList[1]==true && this.preferencesList[2]==false){
      this.authService.changePage('/my-profile')
    }
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
