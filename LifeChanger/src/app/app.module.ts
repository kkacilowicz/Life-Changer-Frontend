import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './main-page/header/header.component';
import { NavComponent } from './main-page/nav/nav.component';
import { MainComponent } from './main-page/main/main.component';
import { FooterComponent } from './main-page/footer/footer.component';
import { AccountComponent } from './account/account.component';
import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    NavComponent,
    MainComponent,
    FooterComponent,
    AccountComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    // RouterModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
