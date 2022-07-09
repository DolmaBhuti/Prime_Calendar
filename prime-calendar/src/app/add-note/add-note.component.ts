import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../notes.service';
import { CalendarService } from '../calendar.service';
import { TimersService } from '../timers.service';
import { Note } from '../Note';
import { Timer } from '../Timer';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import {CdTimerComponent, TimeInterface} from 'angular-cd-timer';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit, AfterViewInit{
  // basicTimer: CdTimerComponent = {} as CdTimerComponent;
  @ViewChild('basicTimer') basicTimer: CdTimerComponent = {} as CdTimerComponent;
  // @ViewChild('timeDisplay') timeDisplay: CdTimerComponent;

  public model = new Note();
  isShow:boolean=false;
  break:boolean=false;
  newTimerTitle: String = "";
  newWorkHr:number=0;
  newWorkMin:number=0;
  newBreakHr:number=0;
  newBreakMin:number=0;
  timerNumber:number = 1;
  durationInSeconds: number = 0;

  loaded: boolean = false;
  secondsToDisplay: [number] = [0];
  timers!: [any]; 
  mysubscription: any; 

  constructor(private route:ActivatedRoute,private noteService:NotesService,private calService : CalendarService, private timerService : TimersService) {}

  ngOnInit(): void {
    this.loaded = false;
    this.route.params.subscribe(params => {
      this.model.eventId = params['id']
      this.noteService.getNote(params['id']).subscribe(noteData=>{
          //console.log("On init noteData: "+ noteData[0].noteText);
        if(noteData == ""){
          console.log("add new noteData")
          this.calService.eventGetById(this.model.eventId).subscribe(event=>{
            let date = new Date()
            let dateString = date.toDateString()
            this.model.noteTitle =event[0].eventTitle;
            this.model.lastEditedDate = date;
            console.log("Note title: "+this.model.noteTitle)
            console.log("lastEditDate: "+this.model.lastEditedDate)
            console.log("noteText: "+this.model.noteText)
            console.log("eventId: "+this.model.eventId)
          })
        }else{
          console.log("data: "+noteData[0].noteTitle)
          this.model = noteData[0]
        }
      })
    })
    this.displayTimer();
    this.loaded = true;
  }

  ngAfterViewInit(): void {
    //@ViewChild('basicTimer', { static: true }) basicTimer: CdTimerComponent;
    // @ViewChild('timeDisplay') timeDisplay: CdTimerComponent;
    // this.basicTimer.autoStart = false;
    //this.displayTimer();
    //this.timeDisplay.stop();

  }

  // ngOnChanges():void{
  //   this.route.params.subscribe(params => {
  //     this.model.eventId = params['id']
  //     this.noteService.getNote(params['id']).subscribe(noteData=>{
  //       console.log("noteData: "+ noteData[0].noteText);
  //       if(noteData == ""){
  //         console.log("add new noteData")
  //         this.calService.eventGetById(this.model.eventId).subscribe(event=>{
  //           let date = new Date()
  //           let dateString = date.toDateString()
  //           this.model.noteTitle =event[0].eventTitle;
  //           this.model.lastEditedDate = date;
  //           console.log("Note title: "+this.model.noteTitle)
  //           console.log("lastEditDate: "+this.model.lastEditedDate)
  //           console.log("noteText: "+this.model.noteText)
  //           console.log("eventId: "+this.model.eventId)})
  //       }else{
  //         console.log("data: "+noteData[0].noteTitle)
  //         this.model = noteData[0]
  //       }
  //     })
  //   })
  //   this.displayTimer();
  // }

  saveNote():void{
    console.log("save note works");
    this.noteService.getNote(this.model.eventId).subscribe(noteData=>{
      if(noteData == ""){
        console.log("save as new")
        this.noteService.addNote(this.model).subscribe(success=>{});
      }else{
        console.log("update exist one")
        let date = new Date()
        this.model.lastEditedDate = date;
        let eventId = noteData[0].eventId;
        let noteId = noteData[0]._id;
        this.noteService.updateNote(eventId,noteId,this.model).subscribe(success=>{});
      }
    })
  }

  showTimerForm():void{
    this.isShow=true;
  }
  closeTimerForm():void{
    this.isShow = false;
  }

  addTimer():void{
    console.log("add timer works");
    let newTimer = new Timer();
    newTimer.timerTitle = this.model.noteTitle+ " " + this.newTimerTitle;
    this.timerNumber++;
    newTimer.eventId = this.model.eventId;
    let wrkHrInMin = this.newWorkHr * 60;
    newTimer.timerDuration = wrkHrInMin + this.newWorkMin;

    if(this.break){
      newTimer.breaks = true;
      let brkHrInMin = this.newBreakHr * 60;
      newTimer.breakDuration = brkHrInMin + this.newBreakMin;
    }

    console.log("New timer: ");
    console.log(newTimer);

    this.timerService.addTimer(newTimer).subscribe(success=>{
      // this.ngOnChanges();
      this.ngOnInit();
      //window.location.reload();
    });
    //this.ngOnInit();

    //reset:
    this.newTimerTitle = "";
    this.newWorkHr = 0;
    this.newWorkMin = 0;
    this.newBreakHr = 0;
    this.newBreakMin = 0;
    this.break=false;
    this.isShow = false;
  }

  displayTimer():void{
    //console.log(this.basicTimer.autoStart)
    let index: number = 0;
    this.timerService.getTimer(this.model.eventId).subscribe(timerData=>{
      this.timers = timerData;
      for(index = 0; index < timerData.length; index++){
        this.secondsToDisplay.push(timerData[index].timerDuration * 60);
        // console.log(this.secondsToDisplay[index]);
        // console.log("id: " + this.model.eventId);
      }
    });
  }
}
