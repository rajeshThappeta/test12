import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  { path: 'userprofile/:username', loadChildren: () => import('./userprofile/userprofile.module').then(m => m.UserprofileModule) },
  { path: 'adminprofile', loadChildren: () => import('./adminprofile/adminprofile.module').then(m => m.AdminprofileModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
