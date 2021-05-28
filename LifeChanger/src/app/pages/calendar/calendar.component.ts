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
    console.log('wejscie do google calendar component');
    this.calendarService.setID();
  }
}
