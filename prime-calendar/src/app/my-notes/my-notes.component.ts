import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { CalendarService } from '../calendar.service';
import { Note } from '../Note'
import { NoteDisplay } from '../NoteDisplay'
@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css']
})
export class MyNotesComponent implements OnInit {

  constructor(private calService : CalendarService, public noteService: NotesService) { }

  eventssaved:NoteDisplay[] = [];

  
  // employees = [ {name: 'John Smith', age: 28, department: 'IT'},
  //           {name: 'Sarah Johnson', age: 32, department: 'IT'},
  //           {name: 'Mark Miller', age: 46, department: 'IT'}
  //       ];
  //       employee = {
  //         name: String,
  //         age: Number,
  //         department: String
  //       }
  ngOnInit(): void {


    this.calService.eventGetFromApi().subscribe(data=>{



      for(let i=0;i<data.length;i++){

        this.noteService.getNote(data[i]._id).subscribe(noteData=>{
          if(noteData == ""){
            console.log("no noteData")
            //let Nevent = {id: data[i]._id, title:data[i].eventTitle, note: "No note found"}
            let env = new NoteDisplay();
            env.id = data[i]._id;
            env.title = data[i].eventTitle;
            env.note = "no note found";
            this.eventssaved.push(env);
            //let emp = new this.employee(name="name", age = 123,department ="department");
          }else{
            //let Nevent = {id: data[i]._id, title:data[i].eventTitle, note: noteData[0].noteTitle}
            let env = new NoteDisplay();
            env.id = data[i]._id;
            env.title = data[i].eventTitle;
            env.note = noteData[0].noteTitle;
            this.eventssaved.push(env);

            console.log("data: "+noteData[0].noteTitle + noteData[0].noteText )

          }


        });
        

      console.log(this.eventssaved);
      }

    })
    
  




}
  }

