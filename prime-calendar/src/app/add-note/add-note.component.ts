import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  ElementRef,
  QueryList,
  Query,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../notes.service';
import { CalendarService } from '../calendar.service';
import { TimersService } from '../timers.service';
import { Note } from '../Note';
import { Timer } from '../Timer';
import { CdTimerComponent, TimeInterface } from 'angular-cd-timer';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
import { NotifierService } from 'angular-notifier';
import { EventFlexible } from '../Recurring';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
})
export class AddNoteComponent implements OnInit, AfterViewInit {
  @ViewChildren('basicTimer') basicTimer: QueryList<CdTimerComponent> =
    {} as QueryList<CdTimerComponent>;

  public model: Note = new Note();
  isShow: boolean = false;
  break: boolean = false;
  newTimerTitle: String = '';
  newWorkHr: number = 0;
  newWorkMin: number = 0;
  newBreakHr: number = 0;
  newBreakMin: number = 0;
  timerNumber: number = 1;
  durationInSeconds: number = 0;
  warning: string = "";

  eventDetails: EventFlexible = {
    eventTitle: '',
    description: '',
    recurring: '',
  };

  loaded: boolean = false;
  secondsToDisplay: [number] = [0];
  timers!: [any];
  mysubscription: any;
  private notifier!: NotifierService;

  tempStart: number = 0;
  tempEnd: number = 0;

  constructor(
    private route: ActivatedRoute,
    private noteService: NotesService,
    private calService: CalendarService,
    private timerService: TimersService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.loaded = false;
    this.displayTimer();
    this.loaded = true;

    this.route.params.subscribe((params) => {
      this.calService.eventGetById(params['id']).subscribe((data) => {
        this.eventDetails.eventTitle = data[0].eventTitle;
        this.eventDetails.description = data[0].description;
        this.eventDetails.start = data[0].start;
        this.eventDetails.end = data[0].end;
        this.eventDetails.startTime = data[0].startTime;
        this.eventDetails.endTime = data[0].endTime;
        this.eventDetails.daysOfWeek = data[0].daysOfWeek;
        this.eventDetails.startRecur = data[0].startRecur;
        this.eventDetails.endRecur = data[0].endRecur;
        this.eventDetails.recurring = data[0].recurring;

        this.tempStart = data[0].startTime;
        this.tempEnd = data[0].endTime;
      });
    });
  }

  editorInit(event: CKEditor4.EventInfo): void {
    this.route.params.subscribe((params) => {
      this.model.eventId = params['id'];
      this.noteService.getNote(params['id']).subscribe((noteData) => {
        if (noteData == '') {
          console.log('add new noteData');
          this.calService
            .eventGetById(this.model.eventId)
            .subscribe((event) => {
              let date = new Date();
              this.model.noteTitle = event[0].eventTitle;
              this.model.lastEditedDate = date;
              console.log('Note title: ' + this.model.noteTitle);
              console.log('lastEditDate: ' + this.model.lastEditedDate);
              console.log('noteText: ' + this.model.noteText);
              console.log('eventId: ' + this.model.eventId);
            });
        } else {
          console.log('data: ' + noteData[0].noteTitle);

          console.log('ori data: ' + this.model.noteTitle);
          this.model = noteData[0];
          event.editor.setData(this.model.noteText);
          console.log('model data: ' + this.model.noteTitle);
        }
      });
    });
  }

  ngAfterViewInit(): void {
    this.basicTimer.changes.subscribe(() => {
      this.basicTimer.forEach((element) => {
        element.stop();
      });
    });
  }

  resumeTimer(index: number): void {
    console.log(typeof this.basicTimer.find((elem, i) => i == index));
    this.basicTimer.find((elem, i) => i == index)?.resume();
  }

  stopTimer(index: number): void {
    console.log(this.basicTimer.find((elem, i) => i == index));
    this.basicTimer.find((elem, i) => i == index)?.stop();
  }

  saveNote(): void {
    console.log('save note works');
    this.noteService.getNote(this.model.eventId).subscribe((noteData) => {
      if (noteData == '') {
        console.log('save as new');
        this.noteService.addNote(this.model).subscribe((success) => {});
      } else {
        console.log('update exist one');
        let date = new Date();
        this.model.lastEditedDate = date;
        let eventId = noteData[0].eventId;
        let noteId = noteData[0]._id;
        this.noteService
          .updateNote(eventId, noteId, this.model)
          .subscribe((success) => {});
      }
    });
  }

  showTimerForm(): void {
    this.isShow = true;
  }
  closeTimerForm(): void {
    this.newTimerTitle = '';
    this.newWorkHr = 0;
    this.newWorkMin = 0;
    this.warning = "";
    this.isShow = false;
  }

  addTimer(): void {
    this.warning = "";
    console.log('add timer works: '+this.newWorkHr+', '+this.newWorkMin);
    if((this.newWorkHr <= 0 && this.newWorkMin <= 0)||isNaN(this.newWorkHr)||isNaN(this.newWorkMin)){
      console.log('invalid');
      this.warning = "Please enter hour and minute"
      return;
    }
    let newTimer = new Timer();
    newTimer.timerTitle = this.newTimerTitle;
    this.timerNumber++;
    newTimer.eventId = this.model.eventId;
    let wrkHrInMin = this.newWorkHr * 60;
    newTimer.timerDuration = wrkHrInMin + this.newWorkMin;

    console.log('New timer: ');
    console.log(newTimer);

    this.timerService.addTimer(newTimer).subscribe((success) => {
      this.ngOnInit();
    });

    //reset:
    this.newTimerTitle = '';
    this.newWorkHr = 0;
    this.newWorkMin = 0;
    this.isShow = false;
  }

  deleteTimer(timer:any): void {
    this.timerService.getTimer(this.model.eventId).subscribe((timerData) => {
      if (timerData != '') {
        this.timerService
          .deleteTimer(this.model.eventId, timer._id)
          .subscribe((sucess) => {
            window.location.reload();
            console.log('timer id: ' + timer._id);
          });
      }
    });
  }

  displayTimer(): void {
    //console.log(this.basicTimer.autoStart)
    let index: number = 0;
    this.route.params.subscribe((params) => {
      this.model.eventId = params['id'];
    });
    this.timerService.getTimer(this.model.eventId).subscribe((timerData) => {
      this.timers = timerData;
      for (index = 0; index < timerData.length; index++) {
        this.secondsToDisplay.push(timerData[index].timerDuration * 60);
        // console.log(this.secondsToDisplay[index]);
        // console.log("id: " + this.model.eventId);
      }
    });
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
}
