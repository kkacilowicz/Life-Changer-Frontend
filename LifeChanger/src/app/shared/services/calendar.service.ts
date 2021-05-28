import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { AlertService } from 'ngx-alerts';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  calendarID: string;
  calendarBgc: string = '23c0ac95';
  calendarMode: string = 'WEEK';
  calendarColor: string = '23AD1457';
  calendarUrl = `https://calendar.google.com/calendar/embed?ctz=Europe%2FWarsaw&wkst=2&color=%${this.calendarColor}&bgcolor=%${this.calendarBgc}&showPrint=0&showCalendars=0&showTz=0&showNav=0&mode=${this.calendarMode}`;
  calendarApi: string = environment.apiUrl;

  sendEventUrl: string = environment.activityUrl;

  pickCalendarFlag: boolean = false;

  date = new Date();
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  event = {
    summary: '',
    start: {
      dateTime: '',
      timeZone: 'Europe/Warsaw',
    },
    end: {
      dateTime: '',
      timeZone: 'Europe/Warsaw',
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
  };

  eventArray: {
    name: string;
    dateStart: string;
    timeStart: string;
    dateEnd: string;
    timeEnd: string;
  }[] = [];

  checkNumber(number) {
    return (number = number < 10 ? `0${number}` : number);
  }

  getCalId(): Observable<any> {
    const token = localStorage.getItem('token');
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    return this.httpClient.get<any>(this.calendarApi + 'calendar', {
      headers: reqHeader,
    });
  }
  async setID() {
    await this.getCalId()
      .toPromise()
      .then((response) => {
        this.calendarID = response.token;
        console.log('Id w setID', this.calendarID);
        this.calendarUrl = `https://calendar.google.com/calendar/embed?src=${this.calendarID}&wkst=2&bgcolor=%${this.calendarBgc}&showPrint=0&color=%${this.calendarColor}&showCalendars=0&showNav=0&showTz=0&mode=${this.calendarMode}`;
      })
      .then(() => {
        if (this.calendarID == undefined || this.calendarID == '') {
          this.authService.changePage('edit-calendar');
        } else {
          this.eventsToArray(this.calendarID);
        }
      });

    return this.calendarID;
  }

  async createEvent(summary, startDate, endDate, calID) {
    const minDate = {
      year: startDate.getFullYear(),
      month: startDate.getMonth() + 1,
      day: startDate.getDate(),
    };
    const maxDate = {
      year: endDate.getFullYear(),
      month: endDate.getMonth() + 1,
      day: endDate.getDate(),
    };
    const minTime = {
      hour: startDate.getHours(),
      minutes: startDate.getMinutes(),
    };
    const maxTime = {
      hour: endDate.getHours(),
      minutes: endDate.getMinutes(),
    };

    minDate.month = this.checkNumber(minDate.month);
    minDate.day = this.checkNumber(minDate.day);
    minTime.hour = this.checkNumber(minTime.hour);
    minTime.minutes = this.checkNumber(minTime.minutes);
    maxDate.month = this.checkNumber(maxDate.month);
    maxDate.day = this.checkNumber(maxDate.day);
    maxTime.hour = this.checkNumber(maxTime.hour);
    maxTime.minutes = this.checkNumber(maxTime.minutes);

    this.event.summary = summary;
    this.event.start.dateTime = `${minDate.year}-${minDate.month}-${minDate.day}T${minTime.hour}:${minTime.minutes}:00+02:00`;
    this.event.end.dateTime = `${maxDate.year}-${maxDate.month}-${maxDate.day}T${maxTime.hour}:${maxTime.minutes}:00+02:00`;

    this.alertService.success(
      `Added event: "${this.event.summary}" for ${minDate.day}.${minDate.month} at ${minTime.hour}:${minTime.minutes} - ${maxTime.hour}:${maxTime.minutes}`
    );
    console.log('Event przed wejsciem do this.sendEvent', this.event);
    await this.sendEvent(calID, this.event)
      .toPromise()
      .then(() => {
        location.reload();
      });
  }

  getGoogleCalendars() {
    const accessToken = localStorage.getItem('accessToken');
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    });
    console.log('Wywolanie get google calendars');

    return this.httpClient.get<any>(
      'https://www.googleapis.com/calendar/v3/users/me/calendarList',
      { headers: reqHeader }
    );
  }

  sendCalendarId(pickedCalendarId) {
    const token = localStorage.getItem('token');
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    }).set('content-type', 'application/json');
    return this.httpClient.post(
      this.calendarApi + 'updatecalendar',
      JSON.stringify({ token: pickedCalendarId }),
      { headers: reqHeader }
    );
  }

  sendEvent(calendarID, event) {
    const accessToken = localStorage.getItem('accessToken');
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    });
    return this.httpClient.post(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
      this.event,
      { headers: reqHeader }
    );
  }

  getCalendarEvents(minTime, maxTime, calID) {
    const accessToken = localStorage.getItem('accessToken');
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    });
    return this.httpClient.get<any>(
      `https://www.googleapis.com/calendar/v3/calendars/${calID}/events?timeMax=${
        maxTime.year
      }-${this.checkNumber(maxTime.month)}-${this.checkNumber(
        maxTime.day
      )}T${this.checkNumber(maxTime.hour)}%3A${this.checkNumber(
        maxTime.minute
      )}%3A00%2B02%3A00&timeMin=${minTime.year}-${this.checkNumber(
        minTime.month
      )}-${this.checkNumber(minTime.day)}T${this.checkNumber(
        minTime.hour
      )}%3A${this.checkNumber(minTime.minute)}%3A00%2B02%3A00`,
      { headers: reqHeader }
    );
  }

  eventsToArray(calID) {
    this.eventArray.length = 0;
    let eventFlag = false;
    const minTime = {
      year: this.date.getFullYear(),
      month: this.date.getMonth() + 1,
      day: this.date.getDate() + 1,
      hour: 0,
      minute: 0,
    };
    const maxTime = {
      year: this.date.getFullYear(),
      month: this.date.getMonth() + 1,
      day: this.date.getDate() + 1,
      hour: 23,
      minute: 0,
    };
    if (calID !== '') {
      console.log('Pobranie eventow z kalendarza');
      console.log('Tablica eventow przed pobraniem', this.eventArray);
      this.getCalendarEvents(minTime, maxTime, calID).subscribe((response) => {
        for (let i = 0; i < response.items.length; i++) {
          let minTimeDate = new Date(response.items[i].start.dateTime);
          let maxTimeDate = new Date(response.items[i].end.dateTime);
          this.eventArray.splice(i, 1, {
            name: response.items[i].summary,
            dateStart: `${this.checkNumber(
              minTimeDate.getDate()
            )}.${this.checkNumber(
              minTimeDate.getMonth() + 1
            )}.${minTimeDate.getFullYear()}`,
            timeStart: `${this.checkNumber(
              minTimeDate.getHours()
            )}:${this.checkNumber(minTimeDate.getMinutes())}`,
            dateEnd: `${this.checkNumber(
              maxTimeDate.getDate()
            )}.${this.checkNumber(
              maxTimeDate.getMonth() + 1
            )}.${maxTimeDate.getFullYear()}`,
            timeEnd: `${this.checkNumber(
              maxTimeDate.getHours()
            )}:${this.checkNumber(maxTimeDate.getMinutes())}`,
          });
          console.log('Tablica eventow PO pobraniem', this.eventArray);
          console.log(`eventy pobrane z kalendarza to : `, response.items);
          if (response.items[i].summary.includes('[LifeChanger]')) {
            eventFlag = true;
          }
        }
        if (!eventFlag) {
          this.giveCalendarEvents(this.eventArray, calID);
        }
      });
    } else {
      console.log(`calendarID = ${calID}`);
    }
  }

  giveCalendarEvents(eventArr, calID) {
    const token = localStorage.getItem('token');
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    });
    if (eventArr.length == 0) {
      let todaysDate = new Date();
      this.httpClient
        .post<any>(
          this.sendEventUrl + 'ProposeActivityOnFreeDay',
          JSON.stringify({
            date: `${todaysDate.getFullYear()}.${todaysDate.getMonth() + 1}.${
              todaysDate.getDate() + 1
            }`,
          }),
          { headers: reqHeader }
        )
        .subscribe({
          next: (response) => {
            console.log('Free day');
            console.log('Wydarzenia z backendu w freeDay: ', response);
            for (let i = 0; i < response.length; i++) {
              let startDateString = `${response[i].dateStart}T${response[i].timeStart}:00`;
              let endDateString = `${response[i].dateEnd}T${response[i].timeEnd}:00`;
              let eventStartTime = new Date(startDateString);
              let eventEndTime = new Date(endDateString);
              this.createEvent(
                response[i].name,
                eventStartTime,
                eventEndTime,
                calID
              );
            }
          },
          error: (err) => {
            this.alertService.warning(err.error.message);
          },
        });
    } else {
      eventArr.sort((a, b) => a.timeStart.localeCompare(b.timeStart));
      console.log('Eventy wyslane na backend: ', eventArr);
      this.httpClient
        .post<any>(this.sendEventUrl + 'ProposeActivity', eventArr, {
          headers: reqHeader,
        })
        .subscribe({
          next: (response) => {
            console.log('Eventy otrzymane z backendu: (busy day)', response);
            for (let i = 0; i < response.length; i++) {
              let startDateString = `${response[i].dateStart}T${response[i].timeStart}:00`;
              let endDateString = `${response[i].dateEnd}T${response[i].timeEnd}:00`;
              let eventStartTime = new Date(startDateString);
              let eventEndTime = new Date(endDateString);

              this.createEvent(
                response[i].name,
                eventStartTime,
                eventEndTime,
                calID
              );
            }
          },
          error: (err) => {
            this.alertService.warning(err.error.message);
          },
        });
    }
  }
}
