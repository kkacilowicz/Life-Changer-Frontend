import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PreferencesService } from 'src/app/shared/services/preferences.service';
import {  AuthService } from 'src/app/shared/services/auth.service';
import { templateSourceUrl } from '@angular/compiler';


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

  choose: boolean = false;
  
  //areaList = [this.love, this.sport, this. culture];



  constructor(
    public Preferences: PreferencesService, 
    public authService: AuthService, 
    public fb: FormBuilder
  ) { }
  
  areaList: boolean[]=[];
  selectedItems: number[] = [];
  option1 = 1;
  option2 = 3;
  option3 = 2;

  ngOnInit(): void {
    this.selectedItems = new Array<number>();
    this.areaList = new Array<boolean>();
    this.love =false;
    this.culture = false;
    this.sport = false;
   
    this.form = this.fb.group({
      categories : [''],
    })

 
  }


  onSubmit() {
    const preferencesObserver = {
       next: x => {
         console.log('Preferences OK');
         this.authService.changePage('details');
      },
      error: err => {
         console.log(err);
       }
     };
    
     this.areaList.push(this.love);
     this.areaList.push(this.sport);
     this.areaList.push(this.culture);
     console.log(this.areaList)
     this.form.patchValue({categories : this.selectedItems})
     this.Preferences.preferences(this.form.value).subscribe(preferencesObserver);
     
   }

  getAreaId(e:any, categories:number)
  {
    if(e.target.checked)
    {
      this.selectedItems.push(categories);
    }
    else{
      this.selectedItems = this.selectedItems.filter(m=>m!=categories);
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
   // console.log(this.sport)
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
   // console.log(this.culture)
    return this.culture;
  }



}
