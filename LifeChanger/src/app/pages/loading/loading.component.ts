import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service'
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass']
})
export class LoadingComponent implements OnInit {

  constructor(public userService: UserService, public authService: AuthService) { }

  ngOnInit(): void {
    
  }

  SearchPreferences(){
    let category = this.userService.userPref.categories[0]
    let category1 = this.userService.userPref.categories[1]
    let category2 = this.userService.userPref.categories[2]
  
    if(category.name=="" && category1.name=="" && category2.name=="" ){
      this.authService.changePage('preferences')
    }
    else{
      this.authService.changePage('main')
    }
  
  
  }


}
