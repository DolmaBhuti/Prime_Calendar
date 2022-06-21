import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../notes.service';
import { CalendarService } from '../calendar.service';
import { Note } from '../Note';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  public model = new Note();
  constructor(private route:ActivatedRoute,private noteService:NotesService,private calService : CalendarService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.model.eventId = params['id']
      this.noteService.getNote(params['id']).subscribe(noteData=>{
        if(noteData == ""){
          console.log("no noteData")
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
        this.calService.eventGetById(this.model.eventId).subscribe(event=>{
          let date = new Date()
          let dateString = date.toDateString()
          this.model.noteTitle =dateString+" "+event[0].eventTitle;
          this.model.lastEditedDate = date;
          console.log("Note title: "+this.model.noteTitle)
          console.log("lastEditDate: "+this.model.lastEditedDate)
          console.log("noteText: "+this.model.noteText)
          console.log("eventId: "+this.model.eventId)
          this.noteService.addNote(this.model).subscribe(success=>{});
        })
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
}
