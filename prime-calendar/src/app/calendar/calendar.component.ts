import { Component, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventAddArg } from '@fullcalendar/angular'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import { Subscription } from 'rxjs';
import { CalendarService } from '../calendar.service';
import Events from '../Event';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  event:Events = {eventTitle: "Test event", startTime:"", date: new Date()};
  
  constructor(private calService : CalendarService) { }
  private calendarSub: Subscription | undefined;


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    selectable: true,

    select: this.handleDateSelect.bind(this), // bind is important!
    
    events: [
      {       
      title: 'BCH237',
      start: '2022-06-12T10:30:00',
      end: '2022-06-12T11:30:00',

      description:'LECTURE',
      department: 'BioChemistry'
      },
      { 
        title: 'event 2', date: '2019-04-02' }
    ],
    eventAdd: this.handleEventAdd.bind(this)

  };
  
  //Click and select a date to add event to the calendar:
  handleDateSelect(selectInfo: DateSelectArg) {

    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    
    
    if (title) {
    
      calendarApi.addEvent({
      
        title,
        
        start: selectInfo.startStr,
        
        end: selectInfo.endStr,
        
        allDay: selectInfo.allDay
    
      });
    }

    }

    //Convert the added event to our custom Event object, and pass to API server:
    handleEventAdd(addInfo: EventAddArg){
      
      //console.log(addInfo.event.title+" "+addInfo.event.start+" "+addInfo.event.end+" "+addInfo.event.allDay)
      var eventNeedsToAdd:Events = {
      eventTitle:addInfo.event.title,
      startTime: addInfo.event.start?.toString()!,
      date: new Date()}
      //console.log(eventNeedsToAdd)

      this.calendarSub = this.calService.eventAdd(eventNeedsToAdd).subscribe(success=>{})
    }
  ngOnInit(): void {
  }

}

