import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptTokenService } from './intercept-token.service';

import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDialogModule} from "@angular/material/dialog";
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
//full calendar plug ins
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!

import { CKEditorModule } from 'ckeditor4-angular';

import { AboutComponent } from './about/about.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventCreateDialogComponent } from './event-create-dialog/event-create-dialog.component';
import { DisplayEventDetailsComponent } from './display-event-details/display-event-details.component';
import { EditEventDetailsComponent } from './edit-event-details/edit-event-details.component';
import { AddNoteComponent } from './add-note/add-note.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    LandingPageComponent,
    CalendarComponent,
    EventCreateDialogComponent,
    DisplayEventDetailsComponent,
    EditEventDetailsComponent,
    AddNoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    FullCalendarModule, // register FullCalendar with you app
    CKEditorModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptTokenService,
    multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }