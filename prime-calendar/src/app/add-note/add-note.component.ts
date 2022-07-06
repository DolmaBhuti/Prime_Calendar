import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../notes.service';
import { CalendarService } from '../calendar.service';
import { TimersService } from '../timers.service';
import { Note } from '../Note';
import { Timer } from '../Timer';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  public model = new Note();
  isShow:boolean=false;
  break:boolean=false;
  newWorkHr:number=0;
  newWorkMin:number=0;
  newBreakHr:number=0;
  newBreakMin:number=0;
  timerNumber:number = 1;

  constructor(private route:ActivatedRoute,private noteService:NotesService,private calService : CalendarService, private timerService : TimersService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.model.eventId = params['id']
      this.noteService.getNote(params['id']).subscribe(noteData=>{
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
            console.log("eventId: "+this.model.eventId)})
        }else{
          console.log("data: "+noteData[0].noteTitle)
          this.model = noteData[0]
        }
      })
    })
  }

  saveNote():void{
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

  addTimer():void{
    let newTimer = new Timer();
    newTimer.timerTitle = this.model.noteTitle+" Timer "+this.timerNumber;
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
    console.log(newTimer)

    this.timerService.addTimer(newTimer).subscribe(success=>{});

    //reset:
    this.newWorkHr = 0;
    this.newWorkMin = 0;
    this.newBreakHr = 0;
    this.newBreakMin = 0;
    this.break=false;
    this.isShow = false;
  }
}
