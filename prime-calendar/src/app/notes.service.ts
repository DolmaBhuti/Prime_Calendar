import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';
import { Note } from './Note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  getNote(eventId: any):Observable<any>{
    console.log("get note from api")
    return this.http.get<any>(`${environment.userAPIBase}/events/${eventId}/notes`)  
  }

  addNote(note:Note): Observable<any>{
    console.log(`URL: ${environment.userAPIBase}/events/${note.eventId}/notes/add`)
    return this.http.post<any>(`${environment.userAPIBase}/events/${note.eventId}/notes/add`, note);
  }

  updateNote( eventId: any, noteId:any, note:Note):Observable<any>{
    console.log(`URL: ${environment.userAPIBase}/events/${eventId}/notes/${noteId}`)
    return this.http.put<any>(`${environment.userAPIBase}/events/${eventId}/notes/${noteId}`, note);
  }
}
