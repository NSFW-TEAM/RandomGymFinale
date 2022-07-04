import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { RandomexeComponent } from './components/randomexe/randomexe.component';
import { NutinfoComponent } from './components/nutinfo/nutinfo.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { ContactComponent } from './components/contact/contact.component';
const routes: Routes = [
  {path:'',redirectTo:'/landing',pathMatch:'full'},
  {path:'landing',component:LandingComponent},
  {path:'randomexe',component:RandomexeComponent},
  {path:'nutinfo',component:NutinfoComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent},
  {path:'adminpanel',component:AdminpanelComponent},
  {path: 'contact', component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
