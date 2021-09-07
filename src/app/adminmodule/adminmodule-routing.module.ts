import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminauthGuard } from '../adminauth.guard';
import { HolidaysComponent } from '../holidays/holidays.component';
import { HrmHomeComponent } from '../hrm-home/hrm-home.component';
import { HrmheaderComponent } from '../hrmheader/hrmheader.component';
import { HrpageComponent } from '../hrpage/hrpage.component';
import { LeaveAnalysisComponent } from '../leave-analysis/leave-analysis.component';
import { SortLeaveFormComponent } from '../sort-leave-form/sort-leave-form.component';
import { UpcomingLeaveComponent } from '../upcoming-leave/upcoming-leave.component';
import { UseraccessComponent } from '../useraccess/useraccess.component';
import { UserlistComponent } from '../userlist/userlist.component';

const routes: Routes = [
  {path:"", component: HrmHomeComponent, canActivate:[AdminauthGuard]},
  {path:"hrpage", component: HrpageComponent, canActivate:[AdminauthGuard]},
  {path:"userRequest", component:UseraccessComponent, canActivate:[AdminauthGuard]},
  {path:"sortforms", component: SortLeaveFormComponent, canActivate:[AdminauthGuard]},
  {path:"leaveAnalysis", component: LeaveAnalysisComponent, canActivate:[AdminauthGuard]},
  {path:"users", component: UserlistComponent, canActivate:[AdminauthGuard]},
  {path:"holidays", component:HolidaysComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminmoduleRoutingModule { }
