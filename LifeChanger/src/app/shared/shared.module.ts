import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './layouts/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { NgProgressModule } from '@ngx-progressbar/core'
import { BrowserModule } from '@angular/platform-browser';
import { AlertModule } from 'ngx-alerts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [NavComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgProgressModule,
    BrowserModule,
    BrowserAnimationsModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, positionX: 'right', positionY: 'top' })
  ],
  exports: [
    NavComponent
  ]
})
export class SharedModule { }
