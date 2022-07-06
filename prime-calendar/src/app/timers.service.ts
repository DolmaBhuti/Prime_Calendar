import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';
import { Timer } from './Timer';

@Injectable({
  providedIn: 'root'
})
export class TimersService {

  constructor(private http: HttpClient) { }

  addTimer(timer:Timer): Observable<any>{
    console.log(`URL: ${environment.userAPIBase}/events/${timer.eventId}/timers/add`)
    return this.http.post<any>(`${environment.userAPIBase}/events/${timer.eventId}/timers/add`, timer);
  }
}
