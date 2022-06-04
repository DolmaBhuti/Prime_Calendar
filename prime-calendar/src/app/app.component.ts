import { Component } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Prime Calendar';
  token: any;

  constructor(private router:Router, private auth:AuthService){}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { 
        this.token = this.auth.readToken();
      }
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
