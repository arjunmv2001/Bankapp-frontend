import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError:string=''
  loginSuccess:boolean=false

constructor (private fb:FormBuilder,private api:ApiService,private loginRouter:Router ){}
  ngOnInit(): void {

  }
loginForm=this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})
login(){
  if(this.loginForm.valid){
    console.log(this.loginForm.value);
    let acno=this.loginForm.value.acno
    let password=this.loginForm.value.password
    this.api.login(acno,password).subscribe((response:any)=>{
      console.log(response);
      

      //success
      this.loginSuccess=true
      //To set current username in to the local storage
      localStorage.setItem('currentUser',response.currentUser)

      //To set current username in to the local storage
      localStorage.setItem('balance',response.balance)

      //To set current acno in to the local storage
      localStorage.setItem('currentAcno',response.currentAcno)

      //To set current acno in to the local storage
      localStorage.setItem('token',response.token)

      setTimeout(()=>{
        this.loginRouter.navigateByUrl('/dashboard')

      },2000)
      // alert('Login Successful')
    },
    (response:any)=>{
      //error message
      this.loginError=response.error.message
      setTimeout(()=>{
        this.loginForm.reset()
        this.loginError=''
      },3000)

    }
    )
    
  }
  else{
    alert('Login Failed')
  }
}

}
