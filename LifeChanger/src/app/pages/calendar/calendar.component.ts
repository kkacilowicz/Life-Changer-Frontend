import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { SafePipe } from 'src/app/safe.pipe';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})

export class CalendarComponent implements OnInit {

  calendarArray: { idCalendar: string, nameCalendar: string}[] = [];
  calendarID: string;

  calendarUrl = `https://calendar.google.com/calendar/embed?ctz=Europe%2FWarsaw&wkst=1&bgcolor=%23ffffff&showPrint=0&showCalendars=0`;

  constructor(private httpClient: HttpClient, public authService: AuthService, private socialAuthService: SocialAuthService, public calendarService: CalendarService, private safePipe: SafePipe, private domSanitizer: DomSanitizer) {
   }

  ngOnInit(): void {
    this.showCalendar();
    this.setCalendarId();
  }


  setCalendarId(){
    this.calendarService.getChoosenCalendarId().subscribe(response =>{
      this.calendarID = response;
      this.calendarUrl = `https://calendar.google.com/calendar/embed?src=${this.calendarID}&ctz=Europe%2FWarsaw&wkst=1&bgcolor=%23ffffff&showPrint=0&showCalendars=0`
    })
  }

pickCalendar(pickedCalendar){
  // console.log(pickedCalendar.idCalendar);
  this.calendarUrl = `https://calendar.google.com/calendar/embed?src=${pickedCalendar.idCalendar}&ctz=Europe%2FWarsaw&wkst=1&bgcolor=%23ffffff&showPrint=0&showCalendars=0`;

  const calendarObserver = {
        next: nxt => {
          // this.calendarArray.length = 0;
        },
        error: err => {
          console.log(err);
        }
      };
  //odkomentowac jak bedzie url
  // this.calendarService.sendCalendarId(pickedCalendar.idCalendar).subscribe(calendarObserver);
}

showCalendar() {
  const calendarObserver = {
    next: response => {
      console.log(response.items);
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




  // addEvent(){
  //   console.log(this.User);
  //   let reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ',
  //     });

  //   this.httpClient.post('https://www.googleapis.com/calendar/v3/calendars/cgr1d92tq6dtp81reav8caubbc@group.calendar.google.com/events', this.event, { headers: reqHeader }).subscribe(response => {
  //     console.log(response);
  //   });
  // }
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   dateClick: this.handleDateClick.bind(this), // bind is important!
  //   events: [
  //     { title: 'event 1', date: '2019-04-01' },
  //     { title: 'event 2', date: '2019-04-02' }
  //   ]
  // };

  // handleDateClick(arg) {
  //   alert('date click! ' + arg.dateStr)
  // }

}
