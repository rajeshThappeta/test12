import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder} from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userFormInfo:FormGroup;
  errMsg:string='';
  errStatus:boolean=false;

  image:File;

  constructor(private fb:FormBuilder,
              private userService:UserService,
              private router:Router) { }

  ngOnInit(): void {
    this.userFormInfo=this.fb.group({
      username:'',
      password:'',
      email:'',
      city:'',
      profilePic:''
    })
  }

  onFormSubmit(){

    //get user obj from form
    let userObj=this.userFormInfo.value;
    //create FormData object
    let formData=new FormData();
    //append userObj to formData
    formData.append('userObj',JSON.stringify(userObj))
    //append profilePIc to formData
    formData.append('profilePic',this.image)
   // console.log(this.userObj.value)
    this.userService.createUser(formData).subscribe({
      
      next:(res)=>{
        if(res.message=="User created"){
          this.errStatus=false;
          //navigate to login component
          this.router.navigateByUrl("/login")
        }
        else{
          this.errStatus=true;
          this.errMsg=res.message;
        }
      },
      error:()=>{}
    })

  }


  onFileSelect(event){
   // console.log(event.target.files[0])
   this.image=event.target.files[0]
  }
}
