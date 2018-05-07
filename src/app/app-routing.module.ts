import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CompanyComponent } from './profile/company/company.component';
import { StudentComponent } from './profile/student/student.component';
import { ProjectsComponent } from './projects/projects.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] },
  { path: 'student', component: StudentComponent, canActivate: [AuthGuard]},
  { path: 'company/:id', component: CompanyComponent, canActivate: [AuthGuard]}
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
