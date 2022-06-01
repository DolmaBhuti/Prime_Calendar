import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import User from '../User';
import { NgForm} from "@angular/forms";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerUser = {userName: "", password: "", password2: ""};
  warning: string = "";
  success: boolean = false;
  loading: boolean = false;
  private registerSub: Subscription | undefined;

  constructor(private auth : AuthService) { }


  ngOnInit(): void {
    

  }
  onSubmit(f: NgForm): void {
    console.log("in onSubmit statement")


    if(this.registerUser.userName != "") //&& (this.registerUser.password === this.registerUser.password2))
    {
      this.loading = true;
      this.registerSub = this.auth.register(this.registerUser).subscribe(success =>{
        this.success = true;
        this.warning = "";
        this.loading = false;
        console.log(this.registerUser.userName + " has been added.")
      },
      err =>{
        this.success = false;
        this.loading = false;
        this.warning = err.error.message;
        console.log(this.registerUser.userName + " could not be added.");
        console.log(err)
        console.log(this.warning);
      });
    }
  }
  // else{
  //   console.log()
  // }}
ngOnDestroy(): void{
  this.registerSub?.unsubscribe();
}
}