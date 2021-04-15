import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleActionsRoutingModule } from './google-actions-routing.module';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    GoogleActionsRoutingModule
  ]
})
export class GoogleActionsModule { }
