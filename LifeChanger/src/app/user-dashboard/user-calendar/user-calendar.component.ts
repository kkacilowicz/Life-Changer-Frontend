import { Component, OnInit } from '@angular/core';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CalendarService } from 'src/app/shared/services/calendar.service';

@Component({
  selector: 'app-user-calendar',
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.sass'],
})
export class UserCalendarComponent implements OnInit {
  constructor(
    public calendarService: CalendarService,
    private alertService: AlertService,
    private authService: AuthService
  ) {}
  calendarArray: { idCalendar: string; nameCalendar: string }[] = [];
  ngOnInit(): void {
    this.showCalendar();
  }
  pickCalendar(pickedCalendar) {
    this.calendarService.calendarUrl = `https://calendar.google.com/calendar/embed?src=${pickedCalendar.idCalendar}&ctz=Europe%2FWarsaw&wkst=1&bgcolor=%23ffffff&showPrint=0&showCalendars=0`;

    const calendarObserver = {
      next: (nxt) => {
        this.calendarService.eventArray.length = 0;
        console.log('Dodano kalendarz do biblioteki');
        this.alertService.success('Calendar choosen');
        this.calendarService.getChoosenCalendarId();
        this.authService.changePage('main');
        this.calendarService.setID();
      },
      error: (err) => {
        console.log(err);
        this.alertService.success(err.message);
      },
    };
    this.calendarService
      .sendCalendarId(pickedCalendar.idCalendar)
      .subscribe(calendarObserver);
  }

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
