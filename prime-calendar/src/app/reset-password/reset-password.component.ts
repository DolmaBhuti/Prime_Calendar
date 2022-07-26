import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserPassService } from '../userPass.service';
import User from "../User";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  message:String = "Loading";
  err:String = "";
  match:boolean = true;
  loading:boolean = false;
  
  valid:boolean = true;
  sent:boolean = false;
  password2:String = "";
  user:User = {userName: "", password: "", _id: ""};


  constructor(private auth: AuthService,private route:ActivatedRoute, private userPassService:UserPassService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.auth.checkToken(params['token']).subscribe(response=>{
        console.log(response)
        if(response.message === 'reset link is ok'){
            this.message = `Hello, ${response.user.userName}`
            this.user._id = response.user._id;
            this.user.userName = response.user.userName;
        }else{
          this.message = `This link is no longer valid.`
          this.valid = false;
        }
      })
    })
  }

  onSubmit(): void {
    
    if(this.user.password == this.password2 && this.user.password != "" && this.password2 != "" ){
    
      this.loading = true;
      
      this.userPassService.updatePass(this.user.userName, this.user).subscribe(success=>{
      this.sent = true;
      this.match = true;
      this.loading = false
      this.err = ""},
      (err) => {
        this.sent = false;
        this.loading = false;
        this.err = err.error.message;
      }
      )
      console.log("this.user.password")
    
    }
    else{
      console.log(this.user.password)
      console.log(this.password2)
      if(this.user.password == "" && this.password2 != ""){
        this.err = `Please write the password`;
      }else if(this.password2 == "" && this.user.password != ""){
        this.err = `Please write the confirm password`
      }else if(this.user.password != this.password2){
        this.err = `Passwords do not match`
      }else{
        this.err = `Please write both password and confirm password`
      }
      
      
      this.match = false;
    }
    
  }

}
