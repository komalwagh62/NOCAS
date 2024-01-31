import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DatabaseComponent } from './database/database.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', component: AdminLoginComponent },
  // { path: '', redirectTo: '', pathMatch: 'full' },
  // // Add a wildcard route or a "not found" route if necessary
  // { path: '**', redirectTo: '' },
  { path: 'Admin/dashboard', component: DatabaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
