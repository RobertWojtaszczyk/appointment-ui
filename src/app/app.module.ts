import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewTimeSlotsComponent } from './new-time-slots/new-time-slots.component';
import {HttpClientModule} from '@angular/common/http';
import {TimeSlotsService} from './shared/time-slots.service';
import { TimeslotsComponent } from './components/timeslots/timeslots.component';

@NgModule({
  declarations: [
    AppComponent,
    NewTimeSlotsComponent,
    TimeslotsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TimeSlotsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
