import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { CalendarService } from 'src/app/shared/services/calendar.service';
import { SafePipe } from 'src/app/safe.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/shared/services/user.service';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
})
export class CalendarComponent implements OnInit {
  calendarArray: { idCalendar: string; nameCalendar: string }[] = [];

  // calendarUrl = `https://calendar.google.com/calendar/embed?ctz=Europe%2FWarsaw&wkst=1&bgcolor=%23ffffff&showPrint=0&showCalendars=0`;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    public authService: AuthService,
    private socialAuthService: SocialAuthService,
    public calendarService: CalendarService,
    private safePipe: SafePipe,
    private domSanitizer: DomSanitizer,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    //to ma sie wykonywac po acces token
    console.log('wejscie do google calendar component');
    // this.calendarService.getChoosenCalendarId();

    this.calendarService.setID();
    // if (
    //   this.calendarService.calendarID == undefined ||
    //   this.calendarService.calendarID == ''
    // ) {
    //   this.authService.changePage('edit-calendar');
    // } else {
    //   this.calendarService.eventsToArray(this.calendarService.calendarID);
    // }
  }

  // pickCalendar(pickedCalendar) {
  //   this.calendarService.calendarUrl = `https://calendar.google.com/calendar/embed?src=${pickedCalendar.idCalendar}&ctz=Europe%2FWarsaw&wkst=1&bgcolor=%23ffffff&showPrint=0&showCalendars=0`;

  //   const calendarObserver = {
  //     next: (nxt) => {
  //       this.calendarService.pickCalendarFlag = true;
  //       console.log('Dodano kalendarz do biblioteki');
  //       this.alertService.success('Calendar choosen');
  //       this.calendarService.getChoosenCalendarId();
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       this.alertService.success(err.message);
  //     },
  //   };
  //   this.calendarService
  //     .sendCalendarId(pickedCalendar.idCalendar)
  //     .subscribe(calendarObserver);
  // }

  showCalendar() {
    const calendarObserver = {
      next: (response) => {
        for (let i = 0; i < response.items.length; i++) {
          this.calendarArray.splice(i, 1, {
            idCalendar: response.items[i].id,
            nameCalendar: response.items[i].summary,
          });
        }
      },
      error: (err) => {
        console.log(err.message);
      },
    };
    this.calendarService.getGoogleCalendars().subscribe(calendarObserver);
  }
}
