import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyleaveComponent } from './applyleave/applyleave.component';
import { DownloadFormComponent } from './download-form/download-form.component';
import { EditleaveformComponent } from './editleaveform/editleaveform.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { HrmHomeComponent } from './hrm-home/hrm-home.component';
import { HrpageComponent } from './hrpage/hrpage.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { SortLeaveFormComponent } from './sort-leave-form/sort-leave-form.component';
import { StatusComponent } from './status/status.component';
import { UpcomingLeaveComponent } from './upcoming-leave/upcoming-leave.component';

const routes: Routes = [
  {path:"home", component : HomeComponent},
  {path:"login", component : LoginComponent},
  {path:"applyleave", component: ApplyleaveComponent},
  {path:"register", component: RegisterComponent},
  {path:"status", component:StatusComponent},
  {path:"history", component: HistoryComponent},
  {path:"history/editleaveform", component : EditleaveformComponent},
  {path:"upcoming", component: UpcomingLeaveComponent},
  {path:"download", component: DownloadFormComponent},
  {path:"hrmHome", component: HrmHomeComponent},
  {path:"hrpage", component: HrpageComponent},
  {path:"sortforms", component: SortLeaveFormComponent},
  {path:"logout", component: LogoutComponent},
  {path:'', redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
