import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EventFlexible } from '../Recurring';
import { CalendarComponent } from '../calendar/calendar.component';
import { EventAddArg, EventChangeArg} from '@fullcalendar/angular';
import {EditEventDetailsComponent} from '../edit-event-details/edit-event-details.component'

@Component({
  selector: 'app-display-event-details',
  templateUrl: './display-event-details.component.html',
  styleUrls: ['./display-event-details.component.css']
})
export class DisplayEventDetailsComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<DisplayEventDetailsComponent>,@Inject(MAT_DIALOG_DATA) public data:EventAddArg, 
  @Inject(MAT_DIALOG_DATA) public cal: CalendarComponent, public dialog:MatDialog) { }

  clickDisplay():void{
    let dialogRef = this.dialog.open(EditEventDetailsComponent,{width:'400px',data:this.data});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
