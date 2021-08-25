import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminauthGuard } from './adminauth.guard';
import { ApplyleaveComponent } from './applyleave/applyleave.component';
import { AuthGuard } from './auth.guard';
import { AvailableleaveComponent } from './availableleave/availableleave.component';
import { DownloadFormComponent } from './download-form/download-form.component';
import { EditleaveformComponent } from './editleaveform/editleaveform.component';
import { HistoryComponent } from './history/history.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { HomeComponent } from './home/home.component';
import { HrmHomeComponent } from './hrm-home/hrm-home.component';
import { HrpageComponent } from './hrpage/hrpage.component';
import { LeaveAnalysisComponent } from './leave-analysis/leave-analysis.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { SortLeaveFormComponent } from './sort-leave-form/sort-leave-form.component';
import { StatusComponent } from './status/status.component';
import { UpcomingLeaveComponent } from './upcoming-leave/upcoming-leave.component';
import { UseraccessComponent } from './useraccess/useraccess.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  {path:"home", component : HomeComponent, canActivate:[AuthGuard]},
  {path:"login", component : LoginComponent},
  {path:"applyleave", component: ApplyleaveComponent, canActivate:[AuthGuard]},
  {path:"register", component: RegisterComponent},
  {path:"status", component:StatusComponent, canActivate:[AuthGuard]},
  {path:"availableLeave", component: AvailableleaveComponent, canActivate:[AuthGuard]},
  {path:"history", component: HistoryComponent, canActivate:[AuthGuard]},
  {path:"history/editleaveform", component : EditleaveformComponent, canActivate:[AuthGuard]},
  {path:"upcoming", component: UpcomingLeaveComponent},
  {path:"download", component: DownloadFormComponent, canActivate:[AuthGuard]},
  {path:"hrmHome", component: HrmHomeComponent, canActivate:[AdminauthGuard]},
  {path:"hrpage", component: HrpageComponent, canActivate:[AdminauthGuard]},
  {path:"userRequest", component:UseraccessComponent, canActivate:[AdminauthGuard]},
  {path:"holidays", component:HolidaysComponent},
  {path:"sortforms", component: SortLeaveFormComponent, canActivate:[AdminauthGuard]},
  {path:"leaveAnalysis", component: LeaveAnalysisComponent, canActivate:[AdminauthGuard]},
  {path:"users", component: UserlistComponent, canActivate:[AdminauthGuard]},
  {path:"logout", component: LogoutComponent},
  {path:'', redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
