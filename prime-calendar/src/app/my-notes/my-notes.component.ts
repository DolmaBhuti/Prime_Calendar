import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { CalendarService } from '../calendar.service';
import { Note } from '../Note';
import { NoteDisplay } from '../NoteDisplay';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css'],
})
export class MyNotesComponent implements OnInit {
  constructor(
    private calService: CalendarService,
    public noteService: NotesService
  ) {}



  eventssaved: NoteDisplay[] = [];

  sbTitle: string = '';
  sbNote: string = '';
  sbLastEdited: string = '';

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
    this.calService.eventGetFromApi().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        

        this.noteService.getNote(data[i]._id).subscribe((noteData) => {
          if (noteData == '') {
            console.log('no noteData');
            //let Nevent = {id: data[i]._id, title:data[i].eventTitle, note: "No note found"}
            let env = new NoteDisplay();
            env.id = data[i]._id;
            env.title = data[i].eventTitle;
            env.note = 'no note found';
            this.eventssaved.push(env);
            //let emp = new this.employee(name="name", age = 123,department ="department");
          } else {
            //let Nevent = {id: data[i]._id, title:data[i].eventTitle, note: noteData[0].noteTitle}
            let env = new NoteDisplay();
            env.id = data[i]._id;
            env.title = data[i].eventTitle;
            env.note = noteData[0].noteTitle;

            env.lastEdited = new Date(
              noteData[0].lastEditedDate
            ).toLocaleString();
            env.contentText = noteData[0].noteText;
            this.eventssaved.push(env);
          }
        });
        console.log(this.eventssaved);
      }
    });
  }

  delNote(id: string): void {
    this.noteService.getNote(id).subscribe((noteData) => {
      if (noteData != '') {
        this.noteService.deleteNote(id, noteData[0]._id).subscribe((sucess) => {
          window.location.reload();
          console.log('note id: ' + noteData[0]._id);
        });
      }
    });
  }

  updSideBar(a: NoteDisplay): void {
    this.sbNote = a.note ;
    this.sbTitle = a.title;
    this.sbLastEdited = a.lastEdited;
  }

  downloadPDF(content: NoteDisplay) {
    let pdf = new jsPDF();

    // const reg = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

    // content.contentText = content.contentText.replace(reg, "");
    pdf.setFont('normal');
    pdf.setFontSize(24);
    pdf.text(content.title, 95, 18);
    pdf.setFontSize(16);
    pdf.text('Last edited on: ' + content.lastEdited, 15, 30);

    var splitTitle = pdf.splitTextToSize(
      this.stripHtmlToText(content.contentText),
      270
    );
    pdf.setFontSize(11);
    var y = 40;
    for (var i = 0; i < splitTitle.length; i++) {
      if (y > 280) {
        y = 10;
        pdf.addPage();
      }
      pdf.text(splitTitle[i], 15, y);
      y = y + 7;
    }

    pdf.save(content.title);
  }

  stripHtmlToText(html: any) {
    var tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    var res = tmp.textContent || tmp.innerText || '';
    res.replace('\u200B', ''); // zero width space
    res = res.trim();
    return res;
  }
}
