import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PreferencesService } from 'src/app/shared/services/preferences.service';
import { EventEmitter } from '@angular/core';


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

  @Output()
  eventLove = new EventEmitter<boolean>();

  constructor(
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
  }

  onSubmit() {
    const detailsObserver = {
      next: x => {
        console.log('Details love OK');
      },
      error: err => {
        console.log(err);
      }
    };

    this.eventLove.emit(this.task)
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
