import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewTimeSlotsComponent } from './new-time-slots/new-time-slots.component';
import {HttpClientModule} from '@angular/common/http';
import {TimeSlotsService} from './time-slot/time-slots.service';
import { TimeSlotListComponent } from './time-slot/time-slot-list/time-slot-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {TimeSlotModule} from './time-slot/time-slot.module';
import { MessageComponent } from './message/message.component';
import {UserModule} from './user/user.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NewTimeSlotsComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TimeSlotModule,
    UserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
