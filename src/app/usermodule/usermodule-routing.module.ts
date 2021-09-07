import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyleaveComponent } from '../applyleave/applyleave.component';
import { AuthGuard } from '../auth.guard';
import { AvailableleaveComponent } from '../availableleave/availableleave.component';
import { DownloadFormComponent } from '../download-form/download-form.component';
import { HistoryComponent } from '../history/history.component';
import { HomeComponent } from '../home/home.component';
import { StatusComponent } from '../status/status.component';
import { UpcomingLeaveComponent } from '../upcoming-leave/upcoming-leave.component';

const routes: Routes = [
  {path:"", component : HomeComponent, canActivate:[AuthGuard]},
  {path:"applyleave", component: ApplyleaveComponent, canActivate:[AuthGuard]},
  {path:"status", component:StatusComponent, canActivate:[AuthGuard]},
  {path:"availableLeave", component: AvailableleaveComponent, canActivate:[AuthGuard]},
  {path:"history", component: HistoryComponent, canActivate:[AuthGuard]},
  {path:"download", component: DownloadFormComponent, canActivate:[AuthGuard]},
  {path:"upcoming", component: UpcomingLeaveComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsermoduleRoutingModule { }
