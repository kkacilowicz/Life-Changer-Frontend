import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  accessToken = localStorage.getItem('accessToken');

  constructor(private httpClient: HttpClient, private authService: AuthService) { }


  event = {
    'start': {
      'dateTime': '2021-05-5T09:00:00-07:00',
      "timeZone": "Europe/Warsaw"
    },
    'end': {
      'dateTime': '2021-05-5T17:00:00-07:00',
      "timeZone": "Europe/Warsaw"
    }
  }

  getGoogleCalendars(): Observable<any>{
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken,
      });

    return this.httpClient.get<any>('https://www.googleapis.com/calendar/v3/users/me/calendarList',{ headers: reqHeader })
  }

  sendCalendarId(pickedCalendarId){
    return this.httpClient.post("endPoint od grzesia",pickedCalendarId);
  }

  getChoosenCalendarId(): Observable<string>{
    return this.httpClient.get<string>('endPoint z id wybranego kalendarza - jesli nie ma to puste');
  }


  addEvent(){
    // const accessToken = localStorage.getItem('accessToken');
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken,
      });

    this.httpClient.post('https://www.googleapis.com/calendar/v3/calendars/cgr1d92tq6dtp81reav8caubbc@group.calendar.google.com/events', this.event, { headers: reqHeader }).subscribe(response => {
      console.log(response);
      window.location.reload();

    });
  }

  // refreshHeroes(){
  //   timer(500).subscribe(() => {

  //   })
  // }

}
