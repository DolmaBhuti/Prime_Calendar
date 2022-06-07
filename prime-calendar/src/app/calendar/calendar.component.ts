import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
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
    eventClick: function(info) { //https://fullcalendar.io/docs/event-model
      console.log(info.event.extendedProps['department'])
      alert('event click! ' + info.event.extendedProps['description'])
      info.event.setStart('2022-06-13T10:30:00');
    }
    
    // eventContent: function(arg) {
    //   console.log(arg.event.extendedProps);
    //   alert('event click! ' + arg.event.extendedProps['department'])

    // }
  };
  
  handleDateClick(arg:any) { //TODO: create/edit/delete event form
    alert('date click! ' + arg.dateStr)  //date click! 2022-06-06
  }

  constructor() { }

  ngOnInit(): void {
  }

}

