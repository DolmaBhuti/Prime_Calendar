import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';
import  User from './User';

@Injectable({
  providedIn: 'root'
})
export class UserPassService {

  constructor(private http: HttpClient) { }


  updatePass( user: any,  userObj:User):Observable<any>{
    console.log(`URL: ${environment.userAPIBase}/passwordChange/${user}`)
    console.log(userObj)
    return this.http.put<any>(`${environment.userAPIBase}/passwordChange/${user}`, userObj);
  }


}
