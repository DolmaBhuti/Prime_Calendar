import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  message:String = "Loading";
  valid:boolean = true;

  constructor(private auth: AuthService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.auth.checkToken(params['token']).subscribe(response=>{
        console.log(response)
        if(response.message === 'reset link is ok'){
            this.message = `Hello, ${response.user.userName}`
        }else{
          this.message = `The link is not valid.`
          this.valid = false;
        }
      })
    })
  }

}
