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
// my services
import { AuthService } from './core/auth.service';
import { UserService } from './_services/user.service';
import { MessagesService } from './_services/messages.service';
// my guards
import { AuthGuard } from './core/auth.guard';
// angular material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';

// my components
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { FooterComponent } from './ui/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { MessagesComponent } from './messages/messages.component';
import { UsernameComponent } from './auth/username/username.component';
import { GoogleLoginComponent } from './auth/google-login/google-login.component';
import { InboxComponent } from './messages/inbox/inbox.component';
import { SentComponent } from './messages/sent/sent.component';
import { NewComponent } from './messages/new/new.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { CompanyComponent } from './profile/company/company.component';
import { StudentComponent } from './profile/student/student.component';

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
    ProfileComponent,
    ProjectDetailsComponent,
    MessagesComponent,
    UsernameComponent,
    GoogleLoginComponent,
    ForgotPasswordComponent,
    CompanyComponent,
    StudentComponent,
    InboxComponent,
    SentComponent,
    NewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTabsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
