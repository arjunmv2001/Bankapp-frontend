import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  //login localhost://4200 - loginpage
  {
    path:'', component:LoginComponent
  },
  //register page
{
  path:'register', component:RegisterComponent

},
{
  path:'dashboard', component:DashboardComponent
},
{
path:'transactions', component:TransactionComponent
},
{
  path:'**', component:PagenotfoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
