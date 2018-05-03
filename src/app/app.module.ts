import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// npm package
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FlexLayoutModule } from '@angular/flex-layout';

// my services
import { AuthService } from './core/auth.service';
import { UserService } from './_services/user.service';
// my guards
import { AuthGuard } from './core/auth.guard';
// angular material
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
// my components
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { FooterComponent } from './ui/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { MessagesComponent } from './messages/messages.component';
import { StudentComponent } from './profile/student/student.component';
import { CompanyComponent } from './profile/company/company.component';
import { UsernameComponent } from './auth/username/username.component';
import { GoogleLoginComponent } from './auth/google-login/google-login.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProjectsComponent,
    ProjectFormComponent,
    ProjectDetailsComponent,
    MessagesComponent,
    StudentComponent,
    CompanyComponent,
    UsernameComponent,
    GoogleLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
