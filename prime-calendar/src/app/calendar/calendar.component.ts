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
  event:Events = {_id:"",eventTitle: "Test event", startTime:"", eventDate: new Date(), userID:"32433234"};
  
  constructor(private calService : CalendarService) { }
  private calendarSub: Subscription | undefined;


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    selectable: true,

    select: this.handleDateSelect.bind(this), // bind is important!
    //select: this.handleDateSelect.bind(this), // bind is important!
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
    // eventClick: function(info) { //https://fullcalendar.io/docs/event-model
    //   console.log(info.event.extendedProps['department'])
    //   alert('event click! ' + info.event.extendedProps['description'])
    //   info.event.setStart('2022-06-13T10:30:00');
      
    // }
    
    // eventContent: function(arg) {
    //   console.log(arg.event.extendedProps);
    //   alert('event click! ' + arg.event.extendedProps['department'])

    // }
  };
  
  handleDateClick(arg:any) { //TODO: create/edit/delete event form
    alert('date click! ' + arg.dateStr)  //date click! 2022-06-06
  }
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
    handleEventAdd(addInfo: EventAddArg){
      
      
      this.calendarSub = this.calService.eventAdd(addInfo).subscribe(success=>{
        //if add event was successful
        
      },
      err=>{
        //if not successful
        
      });
    }
  ngOnInit(): void {
  }

}

