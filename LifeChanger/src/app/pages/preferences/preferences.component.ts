import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { PreferencesService } from 'src/app/shared/services/preferences.service';
import {  AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.sass']
})


export class PreferencesComponent implements OnInit {

  form!: FormGroup;

  constructor(
    public Preferences: PreferencesService, 
    public authService: AuthService, 
    public fb: FormBuilder
  ) { }

  selectedItems: number[] = [];
  option1 = 1;
  option2 = 2;
  option3 = 3;

  ngOnInit(): void {
    this.selectedItems = new Array<number>();

    this.form = this.fb.group({
      Id : [''],
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
   
    this.form.patchValue({Id : this.selectedItems})
    this.Preferences.preferences(this.form.value).subscribe(preferencesObserver);
    this.Preferences.changePage('details');
  }

  getAreaId(e:any, id:number)
  {
    if(e.target.checked)
    {
      this.selectedItems.push(id);
    }
    else{
      this.selectedItems = this.selectedItems.filter(m=>m!=id);
    }
    return this.selectedItems;
  }


}
