import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { StaffComponent } from './staff/staff.component';
import { GlobalInformationComponent } from './global-information/global-information.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ChattingComponent } from './chatting/chatting.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:  "", pathMatch:  "full",redirectTo:  "home"},
  {path:"home", component:HomeComponent},
  {path:"staff", component:StaffComponent},
  {path:"global-information", component:GlobalInformationComponent},
  {path:"login", component:LoginComponent},
  {path:"signup", component:SignupComponent},
  {path:"chatting", component:ChattingComponent},
  {path:"profile", component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
