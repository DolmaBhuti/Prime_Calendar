
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarComponent } from '../calendar/calendar.component';
import { EventAddArg} from '@fullcalendar/angular';
import { EventFlexible } from '../Recurring';
import { Subscription } from 'rxjs';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-edit-event-details',
  templateUrl: './edit-event-details.component.html',
  styleUrls: ['./edit-event-details.component.css']
})
export class EditEventDetailsComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<EditEventDetailsComponent>,@Inject(MAT_DIALOG_DATA) public data:EventAddArg, 
  @Inject(MAT_DIALOG_DATA) public cal: CalendarComponent,
  private calService : CalendarService) { }
  private calendarSub: Subscription | undefined;

  editableEvent: EventFlexible = {
    eventTitle: this.data.event.title, 
    description: this.data.event.extendedProps['description'], 
    start:new Date(this.data.event.start!),
    end:new Date(this.data.event.start!),
    startTime: this.data.event._def.recurringDef?.typeData.startTime.milliseconds,
    endTime: this.data.event._def.recurringDef?.typeData.endTime.milliseconds,
    startRecur:this.data.event._def.recurringDef?.typeData.startRecur!,
    endRecur:this.data.event._def.recurringDef?.typeData.endRecur!,
    daysOfWeek: this.data.event._def.recurringDef?.typeData.daysOfWeek,
    recurring: this.data.event.extendedProps['recurring']
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
  
  onSubmit():void{
    //console.log("clicked!");
  //   if (addInfo.event._def.extendedProps['recurring'] == "daily") {
  //     var addEvent:EventFlexible = {
  //     eventTitle: addInfo.event.title,
  //     start: addInfo.event.start!,
  //     end: addInfo.event.end!,
  //     startTime : addInfo.event._def.recurringDef?.typeData.startTime.milliseconds,
  //     endTime : addInfo.event._def.recurringDef?.typeData.endTime.milliseconds,
  //     description: addInfo.event.extendedProps['description'],
  //     startRecur: addInfo.event._def.recurringDef?.typeData.startRecur!,
  //     endRecur : addInfo.event._def.recurringDef?.typeData.endRecur!,
  //     daysOfWeek: addInfo.event._def.recurringDef?.typeData.daysOfWeek,
  //     recurring: addInfo.event._def.extendedProps['recurring']
  //   }
  //   console.log("handleEventAdd recurring" + addEvent.startTime);
  //   console.log("handleEventAdd recurring" + addEvent.endTime);
  //   this.calendarSub = this.calService.eventAdd(addEvent).subscribe(success=>{})
  // } else if (addInfo.event._def.extendedProps['recurring'] == "weekly") {
  //   var addEvent:EventFlexible = {
  //     eventTitle: addInfo.event.title,
  //     start: addInfo.event.start!,
  //     end: addInfo.event.end!,
  //     startTime: addInfo.event._def.recurringDef?.typeData.startTime.milliseconds,
  //     endTime: addInfo.event._def.recurringDef?.typeData.endTime.milliseconds,
  //     description: addInfo.event.extendedProps['description'],
  //     startRecur: addInfo.event._def.recurringDef?.typeData.startRecur!,
  //     endRecur : addInfo.event._def.recurringDef?.typeData.endRecur!,
  //     daysOfWeek: addInfo.event._def.recurringDef?.typeData.daysOfWeek,
  //     recurring: addInfo.event._def.extendedProps['recurring']
  // }
  // console.log("handleEventAdd recurring" + addInfo);
  // this.calendarSub = this.calService.eventAdd(addEvent).subscribe(success=>{})


  // } else if (addInfo.event._def.extendedProps['recurring'] == "none") {
  //   var addEvent:EventFlexible = {
  //     eventTitle: addInfo.event.title,
  //     start: addInfo.event.start!,
  //     end: addInfo.event.end!,
  //     description: addInfo.event.extendedProps['description'],
  //     recurring: addInfo.event._def.extendedProps['recurring']
  //   }
  //   console.log("handleEventAdd single" + addEvent);
  //   this.calendarSub = this.calService.eventAdd(addEvent).subscribe(success=>{})
  // }
  if (this.editableEvent.recurring == "none") {
      var addEvent: EventFlexible = {
        eventTitle: this.editableEvent.eventTitle,
        start: this.editableEvent.start!,
        end: this.editableEvent.end!,
        description: this.editableEvent.description,
        recurring: this.editableEvent.recurring
      }
      console.log("single event: " + addEvent.start);
      this.calendarSub = this.calService.eventUpdate(addEvent, this.data.event.id).subscribe(success=>{console.log(success.eventTitle)});
    }else if(this.editableEvent.recurring == "daily"){
      var addEvent: EventFlexible = {
          eventTitle: this.editableEvent.eventTitle,
          start: this.editableEvent.start!,
          end: this.editableEvent.end!,
          startTime : this.editableEvent.startTime,
          endTime : this.editableEvent.endTime,
          description: this.editableEvent.description,
          //description: "daily test description",
          startRecur: this.editableEvent.startRecur,
          endRecur : this.editableEvent.endRecur,
          //daysOfWeek: undefined,
          daysOfWeek: [0],
          recurring: this.editableEvent.recurring
      }
      console.log("daily event: " + addEvent.description);
      console.log(addEvent.daysOfWeek);
      this.calendarSub = this.calService.eventUpdate(addEvent, this.data.event.id).subscribe(success=>{});
    }else if(this.editableEvent.recurring == "weekly"){
      var addEvent: EventFlexible = {
          eventTitle: this.editableEvent.eventTitle,
          start: this.editableEvent.start,
          end: this.editableEvent.end,
          startTime: this.editableEvent.startTime,
          endTime: this.editableEvent.endTime,
          description: this.editableEvent.description,
          startRecur: this.editableEvent.startRecur,
          endRecur : this.editableEvent.endRecur,
          daysOfWeek: this.editableEvent.daysOfWeek,
          recurring: this.editableEvent.recurring,
        }
      this.calendarSub = this.calService.eventUpdate(addEvent, this.data.event.id).subscribe(success=>{});
    }
  }
}
