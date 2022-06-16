
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarComponent } from '../calendar/calendar.component';
import { EventChangeArg} from '@fullcalendar/angular';
import { EventFlexible } from '../Recurring';

@Component({
  selector: 'app-edit-event-details',
  templateUrl: './edit-event-details.component.html',
  styleUrls: ['./edit-event-details.component.css']
})
export class EditEventDetailsComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<EditEventDetailsComponent>,@Inject(MAT_DIALOG_DATA) public data:EventChangeArg, 
  @Inject(MAT_DIALOG_DATA) public cal: CalendarComponent,@Inject(MAT_DIALOG_DATA) public editData:EventChangeArg) { }

  editableEvent: EventFlexible = {eventTitle: this.editData.event.title, 
    description: this.editData.event.extendedProps['description'], 
    start:new Date(this.editData.event.start!),
    end:new Date(this.editData.event.start!),
    recurring: this.editData.event.extendedProps['recurring']
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
  
  onSubmit():void{
    
  }

}
