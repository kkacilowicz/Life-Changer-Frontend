import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  
  selector: 'app-user-edit-preferences',
  templateUrl: './user-edit-preferences.component.html',
  styleUrls: ['./user-edit-preferences.component.sass']
})
export class UserEditPreferencesComponent implements OnInit {

 
  love!: boolean;
  sport!: boolean;
  culture!: boolean;
  areaList: boolean[] = []; // list of selected areas of life used for display 

  constructor(
    public userService: UserService, 
  
    ) { }

  buttonAddClicked !: boolean;

  ngOnInit(): void {
    this.userService.preferences();
    this.buttonAddClicked=false;
    this.love = false;
    this.culture = false;
    this.sport = false;
    this.areaList = new Array<boolean>();


  }


  clickButtonAdd(){
    if(this.buttonAddClicked==false){
      this.buttonAddClicked=true;
      console.log("buttonAdd" , this.buttonAddClicked)
    }
    else{
      this.buttonAddClicked=false;
      console.log("buttonAdd" , this.buttonAddClicked)
    }
  }

  changeOptionLove() {
    if (this.love == true) {
      this.love = false;
    }
    else {
      this.love = true;
    }
    
    return this.love;
  }

  changeOptionSport() {
    if (this.sport == true) {
      this.sport = false;
    }
    else {
      this.sport = true;
    }

    return this.sport;
  }

  changeOptionCulture() {
    if (this.culture == true) {
      this.culture = false;
    }
    else {
      this.culture = true;
    }
    return this.culture;
  }


  onSubmit() {

    this.areaList.push(this.love);
    this.areaList.push(this.sport);
    this.areaList.push(this.culture);
   console.log("areaList", this.areaList)

  }
}
