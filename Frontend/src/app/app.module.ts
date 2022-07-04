import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RecaptchaModule } from 'ng-recaptcha';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RandomexeComponent } from './components/randomexe/randomexe.component';
import { NutinfoComponent } from './components/nutinfo/nutinfo.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminpanelComponent } from './components/adminpanel/adminpanel.component';
import { ContactComponent } from './components/contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    FooterComponent,
    RandomexeComponent,
    NutinfoComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    AdminpanelComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
