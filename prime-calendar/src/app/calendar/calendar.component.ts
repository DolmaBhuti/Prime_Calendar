import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventAddArg } from '@fullcalendar/angular'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import { Subscription } from 'rxjs';
import { CalendarService } from '../calendar.service';
import Events from '../Event';

//events dialog
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  event:Events = {eventTitle: "", startTime:"", endTime: "",description: "", date: new Date(), dayOfWeek: [0],recurring: false};
  
  constructor(private calService : CalendarService, private dialog: MatDialog) { }
  private calendarSub: Subscription | undefined;

  //Open event dialog
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;



    //this.dialog.open(CourseDialogComponent, dialogConfig);
  }   

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    selectable: true,

    select: this.handleDateSelect.bind(this), // bind is important!
    
    events: [
     //function that requests ALL events from database
     //getEvents: this.handleAllEventsGet.bind(this)
    ],
    //getEvents: this.handleAllEventsGet.bind(this)
    
    eventAdd: this.handleEventAdd.bind(this),
  };
  
  //Click and select a date to add event to the calendar:
  handleDateSelect(selectDate: DateSelectArg) {

    const title = prompt('Please enter a new title for your event');
    
    const calendarApi = selectDate.view.calendar;
    calendarApi.unselect(); // clear date selection
    
    if (title) {
    
      calendarApi.addEvent({
        title,
        start: selectDate.startStr,
        end: selectDate.endStr,
        //allDay: selectInfo.allDay
      });
    }

  }

  //Convert the added event to our custom Event object, and pass to API server:
  handleEventAdd(addInfo: EventAddArg){
    
    //console.log(addInfo.event.title+" "+addInfo.event.start+" "+addInfo.event.end+" "+addInfo.event.allDay)
    var eventNeedsToAdd:Events = {
    eventTitle:addInfo.event.title,
    startTime: addInfo.event.start?.toString()!,
    endTime: addInfo.event.end?.toString()!,
    description: addInfo.event.extendedProps['description'],
    recurring: addInfo.event._def.recurringDef?.typeData.startRecur,
    dayOfWeek: addInfo.event._def.recurringDef?.typeData.daysOfWeek,
    date: new Date()}
    //console.log(eventNeedsToAdd)

    this.calendarSub = this.calService.eventAdd(eventNeedsToAdd).subscribe(success=>{})
  }

    /*handleAllEventsGet(id: String){
      this.calendarSub = this.calService.eventGet(id).subscribe(success=>{})
    }*/

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(this.event.eventTitle != ""){
      
    }
  }

}