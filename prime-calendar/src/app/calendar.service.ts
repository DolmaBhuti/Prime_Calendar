import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';

//import { JwtHelperService } from '@auth0/angular-jwt';
import Event from './Event';
@Injectable({
  providedIn: 'root'
  })
export class CalendarService {
    constructor( private http: HttpClient) { }
    //add calendar service (save to the mongo db) here
    eventAdd(event: Event): Observable<any>{
      //console.log("service received event: "+JSON.stringify(event))
      return this.http.post<any>(`${environment.userAPIBase}/events/add`, event);
    }

}