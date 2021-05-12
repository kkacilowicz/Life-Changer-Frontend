import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { AlertService } from 'ngx-alerts';
import { min } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  accessToken = localStorage.getItem('accessToken');
  calendarID: string;
  calendarUrl = `https://calendar.google.com/calendar/embed?ctz=Europe%2FWarsaw&wkst=1&bgcolor=%23ffffff&showPrint=0&showCalendars=0`;
  calendarApi: string = environment.apiUrl;

  sendEventUrl: string = environment.activityUrl;

  pickCalendarFlag: boolean = false;

  date = new Date();
  constructor(private httpClient: HttpClient, private authService: AuthService , private alertService: AlertService) { }

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

  createEvent(summary,startDate, endDate, calID){
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
    this.sendEvent(calID, this.event).subscribe(response =>{
      this.alertService.success("Event added");
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

  sendEvent(calendarID, event){
    // console.log(`event: ${event}, calendarID: ${calendarID}`);
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken,
      });
      //cgr1d92tq6dtp81reav8caubbc@group.calendar.google.com
    return this.httpClient.post(`https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`, this.event, { headers: reqHeader });
    // return this.httpClient.post(`https://www.googleapis.com/calendar/v3/calendars/cgr1d92tq6dtp81reav8caubbc@group.calendar.google.com/events`, this.event, { headers: reqHeader });
  }

  getCalendarEvents(minTime, maxTime, calID):Observable<any>{
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken,
      });

    return this.httpClient.get<any>(`https://www.googleapis.com/calendar/v3/calendars/${calID}/events?timeMax=${maxTime.year}-${this.checkNumber(maxTime.month)}-${this.checkNumber(maxTime.day)}T${this.checkNumber(maxTime.hour)}%3A${this.checkNumber(maxTime.minute)}%3A00%2B02%3A00&timeMin=${minTime.year}-${this.checkNumber(minTime.month)}-${this.checkNumber(minTime.day)}T${this.checkNumber(minTime.hour)}%3A${this.checkNumber(minTime.minute)}%3A00%2B02%3A00`,{ headers: reqHeader });
  }

  eventsToArray(calID){
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
      day: this.date.getDate() + 1,
      hour: 23,
      minute: 0
    };

    this.getCalendarEvents(minTime, maxTime, calID).subscribe(response =>{
      for(let i = 0 ; i < response.items.length; i++)
      {
        let minTimeDate = new Date(response.items[i].start.dateTime);
        let maxTimeDate = new Date(response.items[i].end.dateTime);



        this.eventArray.push({
          name: response.items[i].summary,
          dateStart: `${this.checkNumber(minTimeDate.getDate())}.${this.checkNumber(minTimeDate.getMonth()+1)}.${minTimeDate.getFullYear()}`,
          timeStart:`${this.checkNumber(minTimeDate.getHours())}:${this.checkNumber(minTimeDate.getMinutes())}`,
          dateEnd:`${this.checkNumber(maxTimeDate.getDate())}.${this.checkNumber(maxTimeDate.getMonth()+1)}.${maxTimeDate.getFullYear()}`,
          timeEnd:`${this.checkNumber(maxTimeDate.getHours())}:${this.checkNumber(maxTimeDate.getMinutes())}`
          })
      }
      this.giveCalendarEvents(this.eventArray, calID);
    })
  }

  getChoosenCalendarId(){
    const token = localStorage.getItem('token')
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      })
    this.httpClient.get<any>(this.calendarApi + 'calendar', { headers: reqHeader }).subscribe(response =>{
      if(response.token == null)
      {
        this.calendarID = ''
      }else{
        this.pickCalendarFlag = true;
        this.calendarID = response.token;

      // this.calendarID = response.token;
      this.eventsToArray(this.calendarID);
      this.calendarUrl = `https://calendar.google.com/calendar/embed?src=${this.calendarID}&wkst=1&bgcolor=%23ffffff&showPrint=0&showCalendars=0`
      }
    });
  }

  giveCalendarEvents(eventArr, calID){
    const token = localStorage.getItem('token')
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      })
      console.log("eventArray:", eventArr)
      if(eventArr.length == 0 )
      {
        let todaysDate = new Date();
        this.httpClient.post<any>(this.sendEventUrl + 'ProposeActivityOnFreeDay', JSON.stringify({date: `${todaysDate.getFullYear()}.${(todaysDate.getMonth()+1)}.${todaysDate.getDate()}`}) , { headers: reqHeader }).subscribe({next :response => {
          let startDateString = `${response.dateStart}T${response.timeStart}:00`;
          let endDateString = `${response.dateEnd}T${response.timeEnd}:00`;
          let eventStartTime = new Date(startDateString);
          let eventEndTime = new Date(endDateString);
          this.createEvent(response.name, eventStartTime, eventEndTime, calID);
        },
        error: err => {
          this.alertService.warning(err.error.message)
        }
      })

      }
      else
      {
        eventArr.sort((a,b) => a.timeStart.localeCompare(b.timeStart));
        this.httpClient.post<any>(this.sendEventUrl  + 'ProposeActivity', eventArr, { headers: reqHeader }).subscribe({next : response => {
        let startDateString = `${response.dateStart}T${response.timeStart}:00`;
        let endDateString = `${response.dateEnd}T${response.timeEnd}:00`;
        let eventStartTime = new Date(startDateString);
        let eventEndTime = new Date(endDateString);
        this.createEvent(response.name, eventStartTime, eventEndTime, calID);
        },
        error: err =>{
          this.alertService.warning(err.error.message);
        }
      })
      }
  };


}
