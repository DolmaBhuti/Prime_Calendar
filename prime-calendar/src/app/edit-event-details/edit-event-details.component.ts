
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
    start:new Date(this.data.event.start!),
    end:new Date(this.data.event.end!),
    startTime: this.data.event._def.recurringDef?.typeData.startTime.milliseconds,
    endTime: this.data.event._def.recurringDef?.typeData.endTime.milliseconds,
    startRecur:this.data.event._def.recurringDef?.typeData.startRecur!,
    endRecur:this.data.event._def.recurringDef?.typeData.endRecur!,
    daysOfWeek: [new Date(this.data.event.start!).getDay()],
    recurring: this.data.event.extendedProps['recurring']
  }

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
        this.calendarSub = this.calService.eventUpdate(addEvent, this.data.event.id).subscribe(success=>{console.log()});
      }else if(this.editableEvent.recurring == "daily"){
        var addEvent: EventFlexible = {
            eventTitle: this.editableEvent.eventTitle,
            start: new Date(dateStr[0].toString() + "T" + this.editableEvent.start),
            end: new Date(dateStr[0].toString() + "T" + this.editableEvent.end),
            startTime : new Date(dateStr[0].toString() + "T" + this.editableEvent.start).getTime() / 1000,
            endTime : new Date(dateStr[0].toString() + "T" + this.editableEvent.end).getTime() / 1000,
            description: this.editableEvent.description,
            //description: "daily test description",
            startRecur: this.editableEvent.startRecur,
            endRecur : this.editableEvent.endRecur,
            //daysOfWeek: undefined,
            daysOfWeek: this.editableEvent.daysOfWeek,
            recurring: this.editableEvent.recurring
        }
        console.log("milisec: " + new Date(dateStr[0].toString() + "T" + this.editableEvent.end).getTime() / 1000);
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
        console.log(addEvent.daysOfWeek)
        this.calendarSub = this.calService.eventUpdate(addEvent, this.data.event.id).subscribe(success=>{});
      }
    }
}
