import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './core/auth.guard';
import { StudentComponent } from './profile/student/student.component';
import { CompanyComponent } from './profile/company/company.component';

const routes: Routes = [
<<<<<<< HEAD
  { path: '', component: LandingComponent, canActivate: [AuthGuard] },
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'student', component: StudentComponent, canActivate: [AuthGuard]},
  { path: 'company/:id', component: CompanyComponent, canActivate: [AuthGuard]}
=======
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] },
>>>>>>> 0bf0e1017c5e76f17778d22ebbf0187265ea3ef4
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
