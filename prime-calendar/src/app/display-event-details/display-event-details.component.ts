import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventFlexible } from '../Recurring';
import { CalendarComponent } from '../calendar/calendar.component';
import { EventAddArg } from '@fullcalendar/angular';
@Component({
  selector: 'app-display-event-details',
  templateUrl: './display-event-details.component.html',
  styleUrls: ['./display-event-details.component.css']
})
export class DisplayEventDetailsComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<DisplayEventDetailsComponent>,@Inject(MAT_DIALOG_DATA) public data:EventAddArg, @Inject(MAT_DIALOG_DATA) public cal: CalendarComponent) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
