import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { CalendarComponent } from './calendar/calendar.component';
import { GuardAuthService } from './guard-auth.service';
import { AddNoteComponent } from './add-note/add-note.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent, canActivate: [GuardAuthService]},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: '', component: LandingPageComponent},
  { path: 'calendar', component: CalendarComponent, canActivate: [GuardAuthService]},
  { path: 'note/:id', component: AddNoteComponent, canActivate: [GuardAuthService]},
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: 'reset/:token', component: ResetPasswordComponent}
  // { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
