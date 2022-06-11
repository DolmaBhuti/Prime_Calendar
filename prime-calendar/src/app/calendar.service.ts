import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';

//import { JwtHelperService } from '@auth0/angular-jwt';
// import SingleEvent from './Single';
// import RecurringEvent, { EventFlexible } from './Recurring';
import { EventFlexible } from './Recurring';
@Injectable({
  providedIn: 'root'
  })
export class CalendarService {
    constructor( private http: HttpClient) { }
    //add calendar service (save to the mongo db) here
    // singleEventAdd(event: SingleEvent): Observable<any>{
    //   //console.log("service received event: "+JSON.stringify(event))
    //   return this.http.post<any>(`${environment.userAPIBase}/events/add`, event);
    // }

    // recurringEventAdd(event: RecurringEvent): Observable<any>{
    //   //console.log("service received event: "+JSON.stringify(event))
    //   return this.http.post<any>(`${environment.userAPIBase}/events/add`, event);
    // }

    eventAdd(event: EventFlexible): Observable<any>{
      //console.log("service received event: "+JSON.stringify(event))
      return this.http.post<any>(`${environment.userAPIBase}/events/add`, event);
    }

    /*eventGet(id: String): Observable<any>{
      return this.http.get<any>(`${environment.userAPIBase}/events`);
    }*/

}