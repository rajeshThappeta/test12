import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder} from'@angular/forms'
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userCredentialsObj:FormGroup;
  errMessage:string;
  errStatus:boolean=false;
  constructor(private fb:FormBuilder,
              private authService:AuthenticationService,
              private router:Router,
              private userService:UserService)
               { }

  ngOnInit(): void {
    this.userCredentialsObj=this.fb.group({
      userType:'',
      username:'',
      password:''
    })

  }

  onFormSubmit(){
   // console.log(this.userCredentialsObj.value)
    //if userType is user
    if(this.userCredentialsObj.value.userType=='user'){
      this.authService.loginUser(this.userCredentialsObj.value).subscribe({
        next:(res)=>{
         // console.log("res is ",res);
          if(res.message=="success"){
            this.errStatus=false;

            //get token from res obj
            let token=res.token;
            //store token in local stotage
            localStorage.setItem("token",token);
            //update user login status
            this.authService.userLoginStatus=true;
            //get loggedin user data
            this.authService.currentUser=res.user;
            //navigate to userdashboard
            this.router.navigateByUrl(`/userprofile/${res.user.username}`)
          }
          else{
            //alert(res.message)
            this.errStatus=true;
            this.errMessage=res.message;
          }
        },
        error:(err)=>{
          console.log(err);
          alert(err.message)
        }
      })
    }
    //if userType is admin
    if(this.userCredentialsObj.value.userType=='admin'){
      
    }
  }

}
