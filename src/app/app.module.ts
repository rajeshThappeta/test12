import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {ReactiveFormsModule} from'@angular/forms'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthorizationService } from './authorization.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactusComponent,
    LoginComponent,
    SignupComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CollapseModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthorizationService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
