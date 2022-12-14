import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from "./services/auth-guard.service"

const routes: Routes = [
  { path:"", component: HomeComponent },
  { path:"dashboard", component: DashboardComponent, canActivate: [AuthGuard] },//Allows access to page only when signed in.
  { path:"login", component: LoginComponent },
  { path:"signup", component: SignupComponent },
  { path:"**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
