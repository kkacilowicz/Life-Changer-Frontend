import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  accessToken = localStorage.getItem('accessToken');
  calendarID: string;
  calendarUrl = `https://calendar.google.com/calendar/embed?ctz=Europe%2FWarsaw&wkst=1&bgcolor=%23ffffff&showPrint=0&showCalendars=0`;
  calendarApi: string = environment.apiUrl;
  sendEventUrl: string = environment.activityUrl + 'ProposeActivity' ;

  date = new Date();
  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  event = {
    summary :'',
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

  eventArray: { name: string, dateStart: string, timeStart: string, dateEnd: string, timeEnd: string }[] = [];

  checkNumber(number){
    return number = number < 10 ? `0${number}`:number;
  }

  createEvent(summary,startDate, endDate){

    const minDate = {
      year: startDate.getFullYear(),
      month: startDate.getMonth()+1,
      day: startDate.getDate()
    }
    const maxDate = {
      year: endDate.getFullYear(),
      month: endDate.getMonth()+1,
      day: endDate.getDate()
    }
    const minTime = {
      hour: startDate.getHours(),
      minutes: startDate.getMinutes()
    }
    const maxTime = {
      hour: endDate.getHours(),
      minutes: endDate.getMinutes()
    }

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
    this.sendEvent(this.calendarID, this.event).subscribe(response =>{
      console.log('Dodano event');
    })
  }



  getGoogleCalendars(): Observable<any>{
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken,
      });

    return this.httpClient.get<any>('https://www.googleapis.com/calendar/v3/users/me/calendarList',{ headers: reqHeader })
  }

  sendCalendarId(pickedCalendarId){
    const token = localStorage.getItem('token')
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      })
      .set('content-type', 'application/json');
    return this.httpClient.post(this.calendarApi + 'updatecalendar', JSON.stringify({token: pickedCalendarId}), { headers: reqHeader });
  }

  getChoosenCalendarId(){
    const token = localStorage.getItem('token')
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      })
    this.httpClient.get<string>(this.calendarApi + 'calendar', { headers: reqHeader }).subscribe(response =>{
      console.log(response);
      this.calendarID = (response = null)? ' ': response;
      //${this.calendarID} chwilowo nie dziala potem dodam -> chodzi o wybrane id wczesniej
      this.calendarUrl = `https://calendar.google.com/calendar/embed?src=kacper.791@o2.pl&ctz=Europe%2FWarsaw&wkst=1&bgcolor=%23ffffff&showPrint=0&showCalendars=0`
    });
  }


  sendEvent(calendarID, event){
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken,
      });
      //cgr1d92tq6dtp81reav8caubbc@group.calendar.google.com
    // return this.httpClient.post(`https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`, this.event, { headers: reqHeader });
    return this.httpClient.post(`https://www.googleapis.com/calendar/v3/calendars/cgr1d92tq6dtp81reav8caubbc@group.calendar.google.com/events`, this.event, { headers: reqHeader });
  }

  getCalendarEvents(minTime, maxTime):Observable<any>{
    minTime.month = this.checkNumber(minTime.month);
    minTime.day = this.checkNumber(minTime.day);
    minTime.hour = this.checkNumber(minTime.hour);
    minTime.minute = this.checkNumber(minTime.minute);
    maxTime.month = this.checkNumber(maxTime.month);
    maxTime.day = this.checkNumber(maxTime.day);
    maxTime.hour = this.checkNumber(maxTime.hour);
    maxTime.minute = this.checkNumber(maxTime.minute);

    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken,
      });
    // return this.httpClient.get<any>(`https://www.googleapis.com/calendar/v3/calendars/${this.calendarID}/events`);
    return this.httpClient.get<any>(`https://www.googleapis.com/calendar/v3/calendars/kacper.791@o2.pl/events?timeMax=${maxTime.year}-${maxTime.month}-${maxTime.day}T${maxTime.hour}%3A${maxTime.minute}%3A00%2B02%3A00&timeMin=${minTime.year}-${minTime.month}-${minTime.day}T${minTime.hour}%3A${minTime.minute}%3A00%2B02%3A00`,{ headers: reqHeader });
  }

  eventsToArray(){
    const minTime = {
      year: this.date.getFullYear(),
      month: this.date.getMonth() + 1,
      day: this.date.getDate() + 1,
      hour: 0,
      minute: 0
    };
    const maxTime = {
      year: this.date.getFullYear(),
      month: this.date.getMonth() + 1,
      day: this.date.getDate() + 3,
      hour: 23,
      minute: 0
    };

    this.getCalendarEvents(minTime, maxTime).subscribe(response =>{
      for(let i = 0 ; i < response.items.length; i++)
      {
        let minTimeDate = new Date(response.items[i].start.dateTime);
        let maxTimeDate = new Date(response.items[i].end.dateTime);

        this.eventArray.push({
          name: response.items[i].summary,
          dateStart: `${minTimeDate.getDate()}.${minTimeDate.getMonth()+1}.${minTimeDate.getFullYear()}`,
          timeStart:`${minTimeDate.getHours()}:${minTimeDate.getMinutes()}`,
          dateEnd:`${maxTimeDate.getDate()}.${maxTimeDate.getMonth()+1}.${maxTimeDate.getFullYear()}`,
          timeEnd:`${maxTimeDate.getHours()}:${maxTimeDate.getMinutes()}`
          })
        console.log(this.eventArray[i]);
      }
      this.giveCalendarEvents(this.eventArray);
      // console.log(response.items[0]);
      // console.log(`Summary: ${response.items[0].summary}`);
      // console.log(`Start Time: ${response.items[0].start.dateTime}`);
      // console.log(`End Time: ${response.items[0].end.dateTime}`);
    })
  }

  giveCalendarEvents(eventArr){
    const startDate = {
      day: '',
      month: '',
      year: ''
    }
    const token = localStorage.getItem('token')
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      })
    this.httpClient.post<any>(this.sendEventUrl, eventArr, { headers: reqHeader }).subscribe(response => {
      console.log(response);
      // for(let i = 0; i < response.length; i++)
      // {
      //   let eventTime = new Date(response);
      //   createEvent(summary,startDate, endDate, startTime, endTime);
      //   this.createEvent(response.name,startDate, endDate, startTime, endTime);
      // }
      let startDateString = `${response.dateStart}T${response.timeStart}:00`;
      let endDateString = `${response.dateEnd}T${response.timeEnd}:00`;
      let eventStartTime = new Date(startDateString);
      let eventEndTime = new Date(endDateString);
      console.log(eventStartTime);
      console.log(eventEndTime);
      this.createEvent(response.name, eventStartTime, eventEndTime);
    })
  };


}
