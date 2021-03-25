import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './layouts/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { NgProgressModule } from '@ngx-progressbar/core'
import { BrowserModule } from '@angular/platform-browser';
import { AlertModule } from 'ngx-alerts';

@NgModule({
  declarations: [NavComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgProgressModule,
    BrowserModule,
    AlertModule,
  ],
  exports: [
    NavComponent
  ]
})
export class SharedModule { }
