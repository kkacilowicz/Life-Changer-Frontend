import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { PreferencesService } from 'src/app/shared/services/preferences.service';
import {  AuthService } from 'src/app/shared/services/auth.service';
import { DetailsComponent } from './details/details.component';


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
  
  //areaList = [this.love, this.sport, this. culture];



  constructor(
    public Preferences: PreferencesService, 
    public authService: AuthService, 
    public fb: FormBuilder
  ) { }
  
  areaList: boolean[]=[];
  selectedItems: number[] = [];
  option1 = 1;
  option2 = 2;
  option3 = 3;

  ngOnInit(): void {
    this.selectedItems = new Array<number>();
    this.areaList = new Array<boolean>();
    this.love =false;
    this.culture = false;
    this.sport = false;

    this.form = this.fb.group({
      Categories : [''],
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
    console.log(this.areaList)
    this.form.patchValue({Categories : this.selectedItems})
    this.Preferences.preferences(this.form.value).subscribe(preferencesObserver);
    this.Preferences.changePage('details');
  }

  getAreaId(e:any, Categories:number)
  {
    if(e.target.checked)
    {
      this.selectedItems.push(Categories);
    }
    else{
      this.selectedItems = this.selectedItems.filter(m=>m!=Categories);
    }
    return this.selectedItems;
  }

  changeOptionLove()
  {
    if(this.love==true){
      this.love=false;
    }
    else{
      this.love=true;
    }
    //console.log(this.love)
    return this.love;
  }

  changeOptionSport()
  {
    if(this.sport==true){
      this.sport=false;
    }
    else{
      this.sport=true;
    }
    console.log(this.sport)
    return this.sport;
  }

  changeOptionCulture()
  {
    if(this.culture==true){
      this.culture=false;
    }
    else{
      this.culture=true;
    }
    console.log(this.culture)
    return this.culture;
  }



}
