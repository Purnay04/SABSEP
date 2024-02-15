import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [
  {path: '' , component : UserLoginComponent},
  {path: '' , component : AdminLoginComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
