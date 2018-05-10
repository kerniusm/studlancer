import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './core/auth.guard';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'project-details', component: ProjectDetailsComponent },
  { path: 'project-form/:id', component: ProjectFormComponent },
  { path: 'project-form', component: ProjectFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
