import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventAddArg } from '@fullcalendar/angular'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import { Subscription } from 'rxjs';
import { CalendarService } from '../calendar.service';
// import Events from '../Single';
// import SingleEvent from '../Single';
// import RecurringEvent from '../Recurring';
import { EventFlexible } from '../Recurring';

//events dialog
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { AboutComponent } from '../about/about.component';
import { EventCreateDialogComponent } from '../event-create-dialog/event-create-dialog.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  // event:Events = {eventTitle: "", startTime:"", endTime: "",description: "", date: new Date(), dayOfWeek: [0],recurring: false};
  // eventS:SingleEvent = { title:"", start:"", end:"", description:"" };
  // eventR:RecurringEvent = { title:"", start: "", end: "", description :"", daysOfWeek:[0], startRecur: "", endRecur: "" };

  eventTest:EventFlexible = { eventTitle:"", start: new Date(), end:new Date(), description:""}; // <---------
  
  constructor(private calService : CalendarService,public dialog:MatDialog) { }
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

    //const title = prompt('Please enter a new title for your event');

    //generate pop up dialog:
    let dialogRef = this.dialog.open(EventCreateDialogComponent,{width:'400px',data:this.eventTest})
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed, add event: '+result);
      if(result){
        this.eventTest.eventTitle = result.eventTitle;
      this.eventTest.start = result.startTime;
      this.eventTest.end = result.endTime;
      this.eventTest.description = result.description;
      console.log('The dialog was closed, add event: '+this.eventTest.eventTitle);
      console.log(result);

    const title =  this.eventTest.eventTitle.toString();
    const calendarApi = selectDate.view.calendar;
    const start = new Date("2022-06-11T10:30:00-04:00");
    const end = new Date('2022-06-11T12:30:00-04:00');
    const startTime = '10:45:00';
    const endTime = '12:45:00';
    // const startRecur = new Date("2022-06-11T10:30:00");
    const startRecur = null;
    const daysOfWeek = null;
    console.log('title: '+title); 
    if (title) {
    
      calendarApi.addEvent({
        title,
        // start: new Date(selectDate.startStr),
        // end: new Date(selectDate.endStr),
        start,
        end,
        startTime,
        endTime,
        description: this.eventTest.description.toString(),
        startRecur,
        daysOfWeek
        //allDay: selectDate.allDay
      });

    }
    calendarApi.unselect();
      }}); // clear date selection
  }

  recurring : Boolean = true; // dont forget


  //Convert the added event to our custom Event object, and pass to API server:
  handleEventAdd(addInfo: EventAddArg){
    if (this.recurring == true) {
          //console.log(addInfo.event.title+" "+addInfo.event.start+" "+addInfo.event.end+" "+addInfo.event.allDay)
        var addEvent:EventFlexible = {
        eventTitle: addInfo.event.title,
        // start: addInfo.event.start?.toString()!,
        // end: addInfo.event.end?.toString()!,
        start: addInfo.event.start!,
        end: addInfo.event.end!,
        description: addInfo.event.extendedProps['description'],
        // startRecur: addInfo.event._def.recurringDef?.typeData.startRecur?.toString()!,
        // endRecur : addInfo.event._def.recurringDef?.typeData.endRecur?.toString()!,
        startRecur: addInfo.event._def.recurringDef?.typeData.startRecur!,
        endRecur : addInfo.event._def.recurringDef?.typeData.endRecur!,
        daysOfWeek: addInfo.event._def.recurringDef?.typeData.daysOfWeek,
        //allDay: addInfo.event.allDay
        //date: new Date()}
        //console.log(eventNeedsToAdd)
      }
      console.log(addInfo);
      console.log(addEvent);
      console.log(addInfo.event.extendedProps['description']);
      console.log(addInfo.event._instance?.range.start);
      console.log(addInfo.event._instance?.range.end);
      this.calendarSub = this.calService.eventAdd(addEvent).subscribe(success=>{})
    } else {
      var addEvent:EventFlexible = {
        eventTitle: addInfo.event.title,
        //start: addInfo.event.start?.toString()!,
        //end: addInfo.event.end?.toString()!,
        start: addInfo.event.start!,
        end: addInfo.event.end!,
        description: addInfo.event.extendedProps['description'],
        //allDay: addInfo.event.allDay,
      }
      console.log(addEvent);
      console.log(addInfo.event.extendedProps['description']);
      console.log(addInfo.event._instance?.range.start);
      console.log(addInfo.event._instance?.range.end);
      this.calendarSub = this.calService.eventAdd(addEvent).subscribe(success=>{})
    }
  }

    /*handleAllEventsGet(id: String){
      this.calendarSub = this.calService.eventGet(id).subscribe(success=>{})
    }*/
  setRecurring(event: any){
    if(event.value === 'none'){
      this.recurring = false;
      //const startRecur = null;
      //const daysOfWeek = null;
    }else if(event.value === 'daily'){
      const daysOfWeek = null;
    }else{
      const startRecur = new Date("2022-06-11T10:30:00");
      const daysOfWeek:number[] = [6];
    }
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if(this.eventTest.eventTitle != ""){
      
    }
  }

}