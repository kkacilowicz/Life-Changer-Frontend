import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PreferencesService } from 'src/app/shared/services/preferences.service';
import { AuthService } from 'src/app/shared/services/auth.service';



@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.sass'],


})


export class PreferencesComponent implements OnInit {

  form!: FormGroup;


  love!: boolean;
  sport!: boolean;
  culture!: boolean;

  loveOutput!: boolean;
  sportOutput!: boolean;
  cultureOutput!: boolean; 

  choose: boolean = false; // value = true when areas of life are selected 


  constructor(
    public Preferences: PreferencesService,
    public authService: AuthService,
    public fb: FormBuilder
  ) { }


  selectedItems: number[] = []; // list of selected areas of life
  areaList: boolean[] = []; // list of selected areas of life used for display 
  option1 = 1;  // id love
  option2 = 3;  // id sport
  option3 = 2;  // id culture

  ngOnInit(): void {
    this.selectedItems = new Array<number>();
    this.areaList = new Array<boolean>();
    this.love = false;
    this.culture = false;
    this.sport = false;
    this.loveOutput = false;
    this.cultureOutput = false;
    this.sportOutput = false;

    this.form = this.fb.group({
      categories: [''],
    })


  }


  onSubmit() {
    const preferencesObserver = {
      next: x => {
        console.log('Preferences OK');
      },
      error: err => {
        console.log(err);
      }
    };

    this.areaList.push(this.love);
    this.areaList.push(this.sport);
    this.areaList.push(this.culture);
   // console.log(this.areaList)
    this.choose=true;
    console.log(this.choose)
    this.form.patchValue({ categories: this.selectedItems })
    this.Preferences.preferences(this.form.value).subscribe(preferencesObserver);

  }

  selected(task: boolean){
    console.log("Odbieram z kultury:")
    console.log(task)
    this.cultureOutput = task
    this.loveOutput = false
    this.sportOutput = false
  }

  selectedLove(task: boolean){
    console.log("Odbieram z Love:")
    console.log(task)
    this.loveOutput = task;
    this.cultureOutput = false
    this.sportOutput = false
  }

  selectedSport(task: boolean){
    console.log("Odbieram z Sportu:")
    console.log(task)
    this.sportOutput = task;
    this.cultureOutput = false
    this.loveOutput = false
  }


  getAreaId(e: any, categories: number) {
    if (e.target.checked) {
      this.selectedItems.push(categories);
    }
    else {
      this.selectedItems = this.selectedItems.filter(m => m != categories);
    }
    return this.selectedItems;
  }

  changeOptionLove() {
    if (this.love == true) {
      this.love = false;
    }
    else {
      this.love = true;
    }
    //console.log(this.love)
    return this.love;
  }

  changeOptionSport() {
    if (this.sport == true) {
      this.sport = false;
    }
    else {
      this.sport = true;
    }
    // console.log(this.sport)
    return this.sport;
  }

  changeOptionCulture() {
    if (this.culture == true) {
      this.culture = false;
    }
    else {
      this.culture = true;
    }
    // console.log(this.culture)
    return this.culture;
  }
}
