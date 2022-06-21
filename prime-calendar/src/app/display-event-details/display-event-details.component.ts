import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EventFlexible } from '../Recurring';
import { CalendarComponent } from '../calendar/calendar.component';
import { EventAddArg, EventChangeArg, DateSelectArg} from '@fullcalendar/angular';
import {EditEventDetailsComponent} from '../edit-event-details/edit-event-details.component'
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-display-event-details',
  templateUrl: './display-event-details.component.html',
  styleUrls: ['./display-event-details.component.css']
})
export class DisplayEventDetailsComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<DisplayEventDetailsComponent>,public calService : CalendarService,@Inject(MAT_DIALOG_DATA) public data:EventAddArg, 
  @Inject(MAT_DIALOG_DATA) public cal: CalendarComponent, public dialog:MatDialog,
  @Inject(MAT_DIALOG_DATA) public date:DateSelectArg) { }

  clickDisplay():void{
    let dialogRef = this.dialog.open(EditEventDetailsComponent,{width:'400px',data:this.data});
    console.log("start str: " + this.data.event.start);
    var dateStr = this.data.event.startStr.split("T", 2);
    console.log("start str: " + dateStr[0].toString());
    //console.log("start: " + this.editableEvent.start!);
  }

  deleteBtn():void{
    console.log("will delete: " + this.data.event.id);
    this.data.event.remove();
    this.calService.eventDelete(this.data.event.id).subscribe(success=>{this.dialogRef.close();});
    console.log("event deleted");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
