import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PreferencesService } from 'src/app/shared/services/preferences.service';
import { EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-love',
  templateUrl: './love.component.html',
  styleUrls: ['./love.component.sass']
})
export class LoveComponent implements OnInit {

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
  selectedDetails: number[] = [];  // list of selected items
  option1 = 1;
  option2 = 28;
  option3 = 37;
  option4 = 50;
  option5 = 32;
  option6 = 31;

  ngOnInit(): void {
    this.selectedDetails = new Array<number>();
    this.form = this.fb.group({
      categories: [''],
    })
    this.buttonClick=false
    console.log("To odbieram z preferences:", this.preferencesList)
  }

  onSubmit() {
    const detailsObserver = {
      next: x => {
        console.log('Details love OK');
        this.buttonClick=true
        if(this.preferencesList[0]==true && this.preferencesList[1]==false && this.preferencesList[2]==false){
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
