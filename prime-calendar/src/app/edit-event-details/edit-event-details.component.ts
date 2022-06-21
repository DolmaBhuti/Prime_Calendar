
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarComponent } from '../calendar/calendar.component';
import { EventAddArg, EventChangeArg, DateSelectArg} from '@fullcalendar/angular';
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
  @Inject(MAT_DIALOG_DATA) public date:DateSelectArg,
  @Inject(MAT_DIALOG_DATA) public updateData: EventChangeArg,
  private calService : CalendarService) { }
  private calendarSub: Subscription | undefined;

  editableEvent: EventFlexible = {
    eventTitle: this.data.event.title, 
    description: this.data.event.extendedProps['description'], 
    // start:new Date(this.data.event.start!),
    // end:new Date(this.data.event.end!),
    // startTime: this.data.event.start!.getTime() - new Date(this.data.event.startStr.split("T", 2)[0] + "T00:00").getTime(),
    // endTime: this.data.event.end!.getTime() - new Date(this.data.event.startStr.split("T", 2)[0] + "T00:00").getTime(),

    // startTime: new Date(this.data.event.start!).getTime() - new Date(this.data.event.startStr.split("T", 2)[0] + "T00:00").getTime(),
    // endTime: new Date(this.data.event.end!).getTime() - new Date(this.data.event.startStr.split("T", 2)[0] + "T00:00").getTime(),
    // startTime: new Date(this.data.event.start!),
    // startTime: this.data.event._def.recurringDef?.typeData.startTime.milliseconds,
    // endTime: this.data.event._def.recurringDef?.typeData.endTime.milliseconds,
    // startTime : this.data.event.start!.getDate() - new Date(this.data.event.startStr.split("T", 2)[0]).getTime(),
    // endTime : this.data.event.end!.getDate() - new Date(this.data.event.startStr.split("T", 2)[0]).getTime(),

    // start: this.data.event.start!.toTimeString(),
    // start: this.data.event.start!,

    start: (this.data.event.start!.getHours() < 10 ? "0" + this.data.event.start!.getHours() : this.data.event.start!.getHours()) + ":"
    + (this.data.event.start!.getMinutes() < 10 ? "0" + this.data.event.start!.getMinutes() : this.data.event.start!.getMinutes()),
    end: (this.data.event.end!.getHours() < 10 ? "0" + this.data.event.end!.getHours() : this.data.event.end!.getHours()) + ":"
    + (this.data.event.end!.getMinutes() < 10 ? "0" + this.data.event.end!.getMinutes() : this.data.event.end!.getMinutes()),

    startRecur:this.data.event._def.recurringDef?.typeData.startRecur!,
    endRecur:this.data.event._def.recurringDef?.typeData.endRecur!,
    daysOfWeek: [new Date(this.data.event.start!).getDay()],
    recurring: this.data.event.extendedProps['recurring'],
  }

  // startString = (this.data.event.start!.getHours() < 10 ? "0" + this.data.event.start!.getHours() : this.data.event.start!.getHours()) + ":"
  // + (this.data.event.start!.getMinutes() < 10 ? "0" + this.data.event.start!.getMinutes() : this.data.event.start!.getMinutes());
  // endString = (this.data.event.end!.getHours() < 10 ? "0" + this.data.event.end!.getHours() : this.data.event.end!.getHours()) + ":"
  // + (this.data.event.end!.getMinutes() < 10 ? "0" + this.data.event.end!.getMinutes() : this.data.event.end!.getMinutes())


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
  
  onSubmit():void{

    var dateStr = this.data.event.startStr.split("T", 2);

    if (this.editableEvent.recurring == "none") {
        var addEvent: EventFlexible = {
          eventTitle: this.editableEvent.eventTitle,
          //start: new Date(this.data.event.startStr),
          start: new Date(dateStr[0].toString() + "T" + this.editableEvent.start),
          end: new Date(dateStr[0].toString() + "T" + this.editableEvent.end),
          description: this.editableEvent.description,
          recurring: this.editableEvent.recurring
        }
        // console.log(this.updateData.oldEvent.startStr)
        // console.log(this.editableEvent.start + " TYPE: " + typeof(this.editableEvent.start));
        // console.log(this.testEnd + " TYPE: " + typeof(this.testEnd));
        // console.log(this.editableEvent.tempString + " TYPE: " + typeof(this.editableEvent.tempString));
        // console.log(addEvent);
        this.calendarSub = this.calService.eventUpdate(addEvent, this.data.event.id).subscribe(success=>{window.location.reload();});
      }else if(this.editableEvent.recurring == "daily"){
        var addEvent: EventFlexible = {
            eventTitle: this.editableEvent.eventTitle,
            // start: new Date(dateStr[0].toString() + "T" + this.editableEvent.start),
            // end: new Date(dateStr[0].toString() + "T" + this.editableEvent.end),
            // startTime : new Date(dateStr[0].toString() + "T" + this.editableEvent.start).getTime() / 1000,
            // endTime : new Date(dateStr[0].toString() + "T" + this.editableEvent.end).getTime() / 1000,

            startTime: new Date(dateStr[0].toString() + "T" + this.editableEvent.start).getTime() - new Date(dateStr[0]+"T00:00").getTime(),
            endTime: new Date(dateStr[0].toString() + "T" + this.editableEvent.end).getTime() - new Date(dateStr[0]+"T00:00").getTime(),

            description: this.editableEvent.description,
            //description: "daily test description",
            // startRecur: this.editableEvent.startRecur,  // insufficient logic here
            startRecur: new Date(dateStr[0].toString() + "T" + this.editableEvent.start),
            endRecur: new Date(new Date(dateStr[0].toString() + "T00:00").getTime() + this.data.event._def.recurringDef?.typeData.endRecur.getTime() - this.data.event._def.recurringDef?.typeData.startRecur.getTime()),
            // endRecur : this.editableEvent.endRecur, // insufficient logic here **** need to find current range of dates and
            // apply to new startRecur
            //daysOfWeek: undefined,
            daysOfWeek: this.editableEvent.daysOfWeek,
            recurring: this.editableEvent.recurring
        }
        // console.log("milisec: " + new Date(dateStr[0].toString() + "T" + this.endString).getTime() / 1000);
        // console.log(addEvent.daysOfWeek);
        this.calendarSub = this.calService.eventUpdate(addEvent, this.data.event.id).subscribe(success=>{window.location.reload();});
      }else if(this.editableEvent.recurring == "weekly"){
        var addEvent: EventFlexible = {
            eventTitle: this.editableEvent.eventTitle,

            startTime: new Date(dateStr[0].toString() + "T" + this.editableEvent.start).getTime() - new Date(dateStr[0]+"T00:00").getTime(),
            endTime: new Date(dateStr[0].toString() + "T" + this.editableEvent.end).getTime() - new Date(dateStr[0]+"T00:00").getTime(),
            
            description: this.editableEvent.description,
            // startRecur: this.editableEvent.startRecur,
            // endRecur : this.editableEvent.endRecur,
            startRecur: new Date(dateStr[0].toString() + "T" + this.editableEvent.start),
            endRecur: new Date(new Date(dateStr[0].toString() + "T00:00").getTime() + this.data.event._def.recurringDef?.typeData.endRecur.getTime() - this.data.event._def.recurringDef?.typeData.startRecur.getTime()),
            daysOfWeek: this.editableEvent.daysOfWeek,
            recurring: this.editableEvent.recurring,
          }
        // console.log("Start: " + addEvent.start + "\nStartTime: " + addEvent + "\nDays of Week: " + addEvent.daysOfWeek);
        // console.log(addEvent);
        // console.log(this.editableEvent.start!.getTime() - new Date(dateStr[0]+"T00:00").getTime());
        // console.log(this.editableEvent.start + " TYPE: " + typeof(this.startString));
        // console.log(new Date(dateStr[0].toString() + "T" + this.startString).getTime() - new Date(dateStr[0]+"T00:00").getTime());
        this.calendarSub = this.calService.eventUpdate(addEvent, this.data.event.id).subscribe(success=>{window.location.reload();});
      }
    }
}
