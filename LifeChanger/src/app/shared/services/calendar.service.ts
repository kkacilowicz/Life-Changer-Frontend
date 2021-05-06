import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  accessToken = localStorage.getItem('accessToken');
  calendarID: string;
  calendarUrl = `https://calendar.google.com/calendar/embed?ctz=Europe%2FWarsaw&wkst=1&bgcolor=%23ffffff&showPrint=0&showCalendars=0`;


  constructor(private httpClient: HttpClient, private authService: AuthService) { }
  event = {
    summary :'string',
    start: {
      dateTime: '',
      timeZone: "Europe/Warsaw"
    },
    end: {
      dateTime: '',
      timeZone: "Europe/Warsaw"
    }
  }

  eventsArray: { summary: string, startTime: string, endTime: string }[] = [];
  // event = {
  //   start: {
  //     dateTime: '2021-05-7T15:00:00+02:00',
  //     timeZone: "Europe/Warsaw"
  //   },
  //   end: {
  //     dateTime: '2021-05-7T17:00:00+02:00',
  //     timeZone: "Europe/Warsaw"
  //   }
  // }

  createEvent(summary,startDate, endDate, startTime, endTime){
    startDate.month = startDate.month < 10 ? `0${startDate.month}` : startDate.month;
    startDate.day = startDate.day < 10 ? `0${startDate.day}` : startDate.day;
    startTime.hour = startTime.hour < 10 ? `0${startTime.hour}` : startTime.hour;
    startTime.minutes = startTime.minutes < 10 ? `0${startTime.minutes}` : startTime.minutes;
    endDate.month = endDate.month < 10 ? `0${endDate.month}` : endDate.month;
    endDate.day = endDate.day < 10 ? `0${endDate.day}` : endDate.day;
    endTime.hour = endTime.hour < 10 ? `0${endTime.hour}` : endTime.hour;
    endTime.minutes = endTime.minutes < 10 ? `0${endTime.minutes}` : endTime.minutes;

    this.event.summary = summary;
    this.event.start.dateTime = `${startDate.year}-${startDate.month}-${startDate.day}T${startTime.hour}:${startTime.minutes}:00+02:00`;
    this.event.end.dateTime = `${endDate.year}-${endDate.month}-${endDate.day}T${endTime.hour}:${endTime.minutes}:00+02:00`;
    return this.event;
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

  getChoosenCalendarId(){
    this.httpClient.get<string>('endPoint z id wybranego kalendarza - jesli nie ma to puste').subscribe(response =>{
      this.calendarID = response;
      this.calendarUrl = `https://calendar.google.com/calendar/embed?src=${this.calendarID}&ctz=Europe%2FWarsaw&wkst=1&bgcolor=%23ffffff&showPrint=0&showCalendars=0`
    });
  }


  sendEvent(calendarID){
    console.log(this.event);
    const startDate = {
      year: 2021,
      month: 5,
      day: 15
    }
    const endDate = {
      year: 2021,
      month: 5,
      day: 15
    }
    const startTime = {
      hour: 18,
      minutes: 0
    }
    const endTime = {
      hour: 18,
      minutes: 30
    }
    this.event = this.createEvent('Pojscie do baru', startDate, endDate, startTime, endTime);
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken,
      });
    return this.httpClient.post(`https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`, this.event, { headers: reqHeader });
  }

  getCalendarEvents():Observable<any>{
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken,
      });
    // return this.httpClient.get<any>(`https://www.googleapis.com/calendar/v3/calendars/${this.calendarID}/events`);
    return this.httpClient.get<any>(`https://www.googleapis.com/calendar/v3/calendars/kacper.791@o2.pl/events`,{ headers: reqHeader });
  }

  eventsToArray(){
    this.getCalendarEvents().subscribe(response =>{
      for(let i = 0 ; i < response.items.length; i++)
      {
        this.eventsArray.push({summary: response.items[i].summary, startTime: response.items[i].start.dateTime, endTime: response.items[i].end.dateTime})
      }
      // console.log(response.items[0]);
      // console.log(`Summary: ${response.items[0].summary}`);
      // console.log(`Start Time: ${response.items[0].start.dateTime}`);
      // console.log(`End Time: ${response.items[0].end.dateTime}`);
    })
  }

  getEventOffer(){
    this.httpClient.get<any>('endpoint z propozycjami eventow').subscribe(response => {
      this.eventsArray = response;
    });
  }


}
