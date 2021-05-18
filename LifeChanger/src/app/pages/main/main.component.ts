import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service'
import { CalendarService } from 'src/app/shared/services/calendar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  constructor(public authService: AuthService, public userService: UserService, public calendarService: CalendarService) { }

  
  ngOnInit(): void {
    this.userService.preferences()  
  }


}
