import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { StaffComponent } from './staff/staff.component';
import { GlobalInformationComponent } from './global-information/global-information.component';
import { FooterComponent } from './footer/footer.component';
import { ChattingComponent } from './chatting/chatting.component';
import { ProfileComponent } from './profile/profile.component';

import { UserService } from './services/user.service';
import { ApplicationService } from './services/application.service';

import { AuthGuard } from './guards/auth.guard';

const AppRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "staff", component: StaffComponent },
  { path: 'global-information', component: GlobalInformationComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: "chatting", component: ChattingComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StaffComponent,
    GlobalInformationComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    LoginComponent,
    SignupComponent,
    ChattingComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    UserService,
    ApplicationService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
