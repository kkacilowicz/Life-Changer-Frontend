import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { SafePipe } from 'src/app/safe.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/shared/services/user.service';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})

export class CalendarComponent implements OnInit {

  calendarArray: { idCalendar: string, nameCalendar: string}[] = [];
  calendarID: string;

  // calendarUrl = `https://calendar.google.com/calendar/embed?ctz=Europe%2FWarsaw&wkst=1&bgcolor=%23ffffff&showPrint=0&showCalendars=0`;

  constructor(private httpClient: HttpClient,private userService: UserService,  public authService: AuthService, private socialAuthService: SocialAuthService, public calendarService: CalendarService, private safePipe: SafePipe, private domSanitizer: DomSanitizer) {
   }

  ngOnInit(): void {
    
    this.showCalendar();
    this.calendarService.getChoosenCalendarId();
    // if(this.userService.userPref.categories.length == 0)
    // {
    //   this.calendarService.getChoosenCalendarId();
    // }
    // else{
    //   alert("We can't offert you events if you didn't choose any preferences");
    // }
  }

  pickCalendar(pickedCalendar){
    this.calendarService.calendarUrl = `https://calendar.google.com/calendar/embed?src=${pickedCalendar.idCalendar}&ctz=Europe%2FWarsaw&wkst=1&bgcolor=%23ffffff&showPrint=0&showCalendars=0`;

    const calendarObserver = {
          next: nxt => {
            this.calendarService.pickCalendarFlag = true;
            console.log("Dodano kalendarz do biblioteki");
            this.calendarService.getChoosenCalendarId();
          },
          error: err => {
            console.log(err);
          }
        };
    this.calendarService.sendCalendarId(pickedCalendar.idCalendar).subscribe(calendarObserver);
  }

  showCalendar() {
    const calendarObserver = {
      next: response => {
        for(let i = 0; i < response.items.length; i++)
        {
          this.calendarArray.push({idCalendar: response.items[i].id, nameCalendar: response.items[i].summary});
        }
      },
      error: err => {
        console.log(err);
      }
    };
    this.calendarService.getGoogleCalendars().subscribe(calendarObserver);
}

}
