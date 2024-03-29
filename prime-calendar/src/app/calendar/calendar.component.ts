import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventAddArg } from '@fullcalendar/angular'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import { of, Subscription } from 'rxjs';
import { CalendarService } from '../calendar.service';
// import Events from '../Single';
import SingleEvent from '../Single';
import { EventFlexible } from '../Recurring';

//events dialog
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { AboutComponent } from '../about/about.component';
import { EventCreateDialogComponent } from '../event-create-dialog/event-create-dialog.component';

//Display event details
import { DisplayEventDetailsComponent } from '../display-event-details/display-event-details.component';
import { ConditionalExpr } from '@angular/compiler';

//Note
import { NotesService } from '../notes.service';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { EditEventDetailsComponent } from '../edit-event-details/edit-event-details.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  eventTest:EventFlexible = { eventTitle:"", description:"", recurring:""}; // <---------
  
  singleEventList!:any;
  recurringEventList!:any;
  today = new Date()

  constructor(private calService : CalendarService,public dialog:MatDialog, public noteService: NotesService) { }
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
    editable: true,
    selectable: true,
    height:"100%",

    select: this.handleDateSelect.bind(this), // bind is important!
    
    events: [
     //function that requests ALL events from database
     //getEvents: this.handleAllEventsGet.bind(this)
    ],
    //getEvents: this.handleAllEventsGet.bind(this)
    
    eventAdd: this.handleEventAdd.bind(this),

    //Display events details
    eventClick: this.handleEventClick.bind(this), 

    eventDrop: this.handleEventDrop.bind(this)
  };
  
  //Click and select a date to add event to the calendar:
  handleDateSelect(selectDate: DateSelectArg) {
    console.log(selectDate.startStr);
    //generate pop up dialog:
    let dialogRef = this.dialog.open(EventCreateDialogComponent,{width:'400px',data:this.eventTest})
    dialogRef.afterClosed().subscribe(result => {
      if(result.recurring == "daily") {
        this.eventTest.eventTitle = result.eventTitle;
        this.eventTest.startTime = result.start;
        this.eventTest.endTime = result.end;
        this.eventTest.description = result.description;
        // this.eventTest.startRecur = result.start;
        // this.eventTest.endRecur = result.endRecur;
        this.eventTest.recurring = result.recurring;
        const calendarApi = selectDate.view.calendar;
        calendarApi.addEvent({
          title:this.eventTest.eventTitle.toString(),
          // groupId:this.eventTest.groupId?.toString(),
          startTime:this.eventTest.start,
          endTime:this.eventTest.end,
          description: this.eventTest.description.toString(),
          //Hard code time adjustment
          startRecur: selectDate.startStr + "T04:00",
          endRecur: selectDate.endStr, //
          recurring: this.eventTest.recurring.toString()
        });
        calendarApi.unselect();


      } else if (result.recurring == "weekly") {
        this.eventTest.eventTitle = result.eventTitle;
        this.eventTest.startTime = result.start;
        this.eventTest.endTime = result.end;
        this.eventTest.description = result.description;
        // this.eventTest.startRecur = result.start;
        // this.eventTest.endRecur = result.endRecur;
        this.eventTest.recurring = result.recurring;

        const calendarApi = selectDate.view.calendar;
        calendarApi.addEvent({
          title:this.eventTest.eventTitle.toString(),
          // groupId:this.eventTest.groupId?.toString(),
          startTime:this.eventTest.start,
          endTime:this.eventTest.end,
          description: this.eventTest.description.toString(),
          startRecur: selectDate.startStr,
          endRecur: selectDate.endStr,
          recurring: this.eventTest.recurring.toString(),
          daysOfWeek: [new Date(selectDate.startStr + "T04:00").getDay()]
        });
        calendarApi.unselect();


      } else if (result.recurring == "none") {
        this.eventTest.start = new Date(selectDate.startStr + "T" + result.start);
        this.eventTest.end = new Date(selectDate.startStr + "T" + result.end);
        this.eventTest.eventTitle = result.eventTitle;
        this.eventTest.description = result.description;
        this.eventTest.recurring = result.recurring;
        const calendarApi = selectDate.view.calendar;

        calendarApi.addEvent({
          title:this.eventTest.eventTitle.toString(),
          //TODO: figure out date+duration
          start:this.eventTest.start, //concat after
          end:this.eventTest.end, //concat after
          description: this.eventTest.description.toString(),
          recurring: this.eventTest.recurring.toString()
        });
        
      }
    });
  }

  //Convert the added event to our custom Event object, and pass to API server:
  handleEventAdd(addInfo: EventAddArg){
    if (addInfo.event._def.extendedProps['recurring'] == "daily") {
        var addEvent:EventFlexible = {
        eventTitle: addInfo.event.title,
        start: addInfo.event.start!,
        end: addInfo.event.end!,
        startTime : addInfo.event._def.recurringDef?.typeData.startTime.milliseconds,
        endTime : addInfo.event._def.recurringDef?.typeData.endTime.milliseconds,
        description: addInfo.event.extendedProps['description'],
        startRecur: addInfo.event._def.recurringDef?.typeData.startRecur!,
        endRecur : addInfo.event._def.recurringDef?.typeData.endRecur!,
        daysOfWeek: addInfo.event._def.recurringDef?.typeData.daysOfWeek,
        recurring: addInfo.event._def.extendedProps['recurring']
      }
      console.log("handleEventAdd recurring" + addEvent.startTime);
      console.log("handleEventAdd recurring" + addEvent.endTime);
      this.calendarSub = this.calService.eventAdd(addEvent).subscribe(success=>{window.location.reload();})
    } else if (addInfo.event._def.extendedProps['recurring'] == "weekly") {
      var addEvent:EventFlexible = {
        eventTitle: addInfo.event.title,
        start: addInfo.event.start!,
        end: addInfo.event.end!,
        startTime: addInfo.event._def.recurringDef?.typeData.startTime.milliseconds,
        endTime: addInfo.event._def.recurringDef?.typeData.endTime.milliseconds,
        description: addInfo.event.extendedProps['description'],
        startRecur: addInfo.event._def.recurringDef?.typeData.startRecur!,
        endRecur : addInfo.event._def.recurringDef?.typeData.endRecur!,
        daysOfWeek: addInfo.event._def.recurringDef?.typeData.daysOfWeek,
        recurring: addInfo.event._def.extendedProps['recurring']
    }
    console.log("handleEventAdd recurring" + addInfo);
    this.calendarSub = this.calService.eventAdd(addEvent).subscribe(success=>{window.location.reload();})


    } else if (addInfo.event._def.extendedProps['recurring'] == "none") {
      var addEvent:EventFlexible = {
        eventTitle: addInfo.event.title,
        start: addInfo.event.start!,
        end: addInfo.event.end!,
        description: addInfo.event.extendedProps['description'],
        recurring: addInfo.event._def.extendedProps['recurring']
      }
      console.log("handleEventAdd single" + addEvent);
      this.calendarSub = this.calService.eventAdd(addEvent).subscribe(success=>{window.location.reload();})
    }
  }


  handleEventClick(info: any){

    let dialogRef = this.dialog.open(DisplayEventDetailsComponent,{width:'400px',data: info});
  }

  handleEventDrop(info: any){

    let dialogRef = this.dialog.open(EditEventDetailsComponent, {
      width: '400px',
      data: info,
      });
    
  }



  ngOnInit(): void {
    this.calService.eventGetFromApi().subscribe(data=>{

      let events:Object[] = [];
      let singleEvents = [];
      let recurringEvents = [];

      for(let i=0;i<data.length;i++){

        //display single events

        let eventSingle = {id: data[i]._id, title:data[i].eventTitle,start:data[i].start, end:data[i].end, description: data[i].description, recurring: data[i].recurring}

        events.push(eventSingle);
        console.log(eventSingle.id);

        
        let localDate = new Date(data[i].start)
        
        if(localDate.toDateString() == this.today.toDateString()){
          let e = {title:data[i].eventTitle,start:data[i].start,end:data[i].end,description:data[i].description}
          
          singleEvents.push(e);
          this.singleEventList = singleEvents
        }

       

        //display recurring

        let eventRecurring = {id: data[i]._id,title:data[i].eventTitle,startTime:{years:0,months:0,days:0,milliseconds:data[i].startTime},
        endTime:{years:0,months:0,days:0,milliseconds:data[i].endTime}, 
        startRecur: data[i].startRecur, endRecur: data[i].endRecur, daysOfWeek:data[i].daysOfWeek,
        description: data[i].description, recurring: data[i].recurring}

        events.push(eventRecurring);

        let localStartDate = new Date(data[i].startRecur)
        let localEndDate = new Date(data[i].endRecur)
        console.log(data[i].eventTitle+" start date: "+localStartDate)
        if(localStartDate < this.today && localEndDate > this.today){
          if(data[i].recurring == "daily" || data[i].daysOfWeek == this.today.getDay()){
            let hStart = Math.round(parseInt(data[i].startTime)/3600000)
            let mStart = (parseInt(data[i].startTime)%3600000) /60000
            let hEnd = Math.round(parseInt(data[i].endTime)/3600000)
            let mEnd = (parseInt(data[i].endTime)%3600000) /60000
            let startTimeString;
            let endTimeString;
            if(hStart == 12){
              startTimeString = "12:"+(mStart>10?mStart:'0'+mStart)+' PM'
            }else if(hStart>12){
              startTimeString = hStart-12+":"+(mStart>10?mStart:'0'+mStart)+' PM'
            }else if(hStart=0){
              startTimeString = "12:"+(mStart>10?mStart:'0'+mStart)+' AM'
            }else{
              startTimeString = hStart+":"+(mStart>10?mStart:'0'+mStart)+' AM'
            }
            if(hEnd == 12){
              endTimeString = "12:"+(mEnd>10?mEnd:'0'+mEnd)+' PM'
            }else if(hEnd>12){
              endTimeString = hEnd-12+":"+(mEnd>10?mEnd:'0'+mEnd)+' PM'
            }else if(hEnd=0){
              endTimeString = "12:"+(mEnd>10?mEnd:'0'+mEnd)+' AM'
            }else{
              endTimeString = hEnd+":"+(mEnd>10?mEnd:'0'+mEnd)+' AM'
            }


            console.log(startTimeString+' - '+endTimeString)


            let e = {title:data[i].eventTitle,startTime:startTimeString,endTime:endTimeString,description:data[i].description}

            recurringEvents.push(e)
            this.recurringEventList = recurringEvents
          }
        }

      }

      this.calendarOptions.events = events

    })

  }

}

  
