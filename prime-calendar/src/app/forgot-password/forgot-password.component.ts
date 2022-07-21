import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import User from "../User";
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  user:User = {userName: "", password: "", _id: ""};
  warning: string = "";
  sent:boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  
  onSubmit(): void {
    this.warning = "";
    this.sent = false;
    console.log("Send clicked to: "+this.user.userName)
    this.auth.sendPasswordChangeEmail(this.user).subscribe((data)=>{
      console.log("Send email: "+data.userName)
      this.sent = true},
    err=>{
      this.warning = err.error.message;
      console.log(err.error.message)})
  }

}
