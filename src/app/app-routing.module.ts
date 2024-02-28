import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './userD/user-login/user.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { UserRegisterComponent } from './userD/user-register/user-register.component';
import { AdminComponent } from './admin/admin.component';
import { ForgotPasswordComponent } from './userD/forgot-password/forgot-password.component';
import { MatOptionParentComponent } from '@angular/material/core';

const routes: Routes = [
  {path:'Home', component: HomeComponent},
  { path: 'UserLogin', component: UserComponent },
  { path: 'user-registration', component: UserRegisterComponent },
  {path:'forgot-pass', component:ForgotPasswordComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }