import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventFlexible } from '../Recurring';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'calendar-dialog',
  templateUrl: './event-create-dialog.component.html',
  styleUrls: ['./event-create-dialog.component.css']
})
export class EventCreateDialogComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<EventCreateDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:EventFlexible, @Inject(MAT_DIALOG_DATA) public cal: CalendarComponent) { }
  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  set(event: any){
    this.cal.setRecurring(event);
  }


}
