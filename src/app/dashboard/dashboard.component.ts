import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  [x: string]: any;
  deleteSuccessMsg: String=''
  deleteConfirmStatus:boolean =false //delete conformation 
  acno:any //
  user:string='' //To hold the current user name
  bal:string=''
  currentAcno:string=''
  trasferSuccess:string=''
  transferError:string=''
  logOutSuccess:boolean=false
  constructor(private fb:FormBuilder, private api:ApiService, private logoutRouter:Router){}

  ngOnInit(): void {
    if(!localStorage.getItem("token")){
      alert("Please login")
      this.logoutRouter.navigateByUrl('')
    }
    if(localStorage.getItem('currentUser')){
      this.user=localStorage.getItem('currentUser')||'';
    }
    // if(localStorage.getItem('balance')){
    //   this.bal=localStorage.getItem('balance')||'';
    // }
    if(localStorage.getItem('currentAcno')){
      this.currentAcno=localStorage.getItem('currentAcno')||'';
    }

  }
  //create a formGroup and array
  fundTransferForm=this.fb.group({
    creditacno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })
  isCollapse: boolean=false;
  collapse(){
    this.isCollapse=!this.isCollapse
  }
  //fund transfer
  dashboardForm(){
    if(this.fundTransferForm.valid){
      let creditacno=this.fundTransferForm.value.creditacno
      let password=this.fundTransferForm.value.password
      let amount = this.fundTransferForm.value.amount
      this.api.fundTransfer(creditacno,password,amount).subscribe((result:any)=>{
        console.log(result);
        this.trasferSuccess=result.message
        setTimeout(()=>{
          this.trasferSuccess=''
          this.fundTransferForm.reset()
        },3000)
        
      },
      (result:any)=>{
        console.log(result.error.message);
        this.transferError=result.error.message
        setTimeout(()=>{
          this.transferError=''
          this.fundTransferForm.reset()
        },3000)
        
      })
      // alert('Transfer Successful')
    }
    else{
      alert('Please Enter Valid Details')
    }
  }

  getBalance(){
    this.api.getBalance(this.currentAcno).subscribe((result:any)=>{
      this.bal=result.balance
    },
    (result:any)=>{
      alert(result.error.message)
    })
  }
  reset(){
    this.fundTransferForm.reset()
  }
  logout(){
    this.logOutSuccess=true
    
    setTimeout(()=>{
      this.logoutRouter.navigateByUrl('')
      localStorage.clear()
    },3000)
  }
  deleteAccount(){
    //data to be shared with the child
    this.acno=localStorage.getItem('currentAcno')
    this.deleteConfirmStatus=true
  }
  cancelDeleteConfirm(){
    this.acno=''
    this.deleteConfirmStatus=false
  }
  deleteFromParent(){
    this.api.deleteAccount().subscribe((result:any)=>{
      localStorage.clear()
      this.deleteSuccessMsg=result.message
      setTimeout(()=>{
        this.logoutRouter.navigateByUrl('') //redirect to login page
      },3000)
    })
  }
}
