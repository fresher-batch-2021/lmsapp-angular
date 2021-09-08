import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
const routes: Routes = [
  // {path:"home", component : HomeComponent, canActivate:[AuthGuard]},
  {path:"login", component : LoginComponent},
  // {path:"applyleave", component: ApplyleaveComponent, canActivate:[AuthGuard]},
  {path:"register", component: RegisterComponent},
  // {path:"status", component:StatusComponent, canActivate:[AuthGuard]},
  // {path:"availableLeave", component: AvailableleaveComponent, canActivate:[AuthGuard]},
  // {path:"history", component: HistoryComponent, canActivate:[AuthGuard]},
  // {path:"upcoming", component: UpcomingLeaveComponent},
  // {path:"download", component: DownloadFormComponent, canActivate:[AuthGuard]},
  // {path:"hrmheader", component: HrmheaderComponent},
  // {path:"hrmHome", component: HrmHomeComponent, canActivate:[AdminauthGuard]},
  // {path:"hrpage", component: HrpageComponent, canActivate:[AdminauthGuard]},
  // {path:"userRequest", component:UseraccessComponent, canActivate:[AdminauthGuard]},
  // {path:"holidays", component:HolidaysComponent},
  // {path:"sortforms", component: SortLeaveFormComponent, canActivate:[AdminauthGuard]},
  // {path:"leaveAnalysis", component: LeaveAnalysisComponent, canActivate:[AdminauthGuard]},
  // {path:"users", component: UserlistComponent, canActivate:[AdminauthGuard]},
  {path:"logout", component: LogoutComponent},
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'user', loadChildren: ()=>import("./usermodule/usermodule.module").then(m => m.UsermoduleModule)},
  {path:'admin', loadChildren: () => import("./adminmodule/adminmodule.module").then(m => m.AdminmoduleModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
