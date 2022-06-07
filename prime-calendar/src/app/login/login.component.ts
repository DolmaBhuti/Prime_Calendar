  
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import User from "../User";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  user:User = {userName: "", password: "", _id: ""};
  warning: string = "";
  loading:boolean = false;
  loginSub: Subscription | undefined;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(): void {

    if(this.user.userName != "" && this.user.password != "" ){
      this.loading = true;
      this.loginSub = this.auth.login(this.user).subscribe(success =>{
        
        this.warning = "";
        this.loading = false;
        localStorage.setItem('access_token', success.token);

        this.router.navigate(['/calendar']);
        console.log(this.user.userName + " has been logged in.") 
      },
      err =>{
        this.loading = false;
        this.warning = err.error.message;
        console.log(this.user.userName + " could not be logged in.");
        console.log("error message from API: " + this.warning);
      });
    }

     }
     ngOnDestroy(): void{
       this.loginSub?.unsubscribe();
     }

}
