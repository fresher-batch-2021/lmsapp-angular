import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsermoduleRoutingModule } from './usermodule-routing.module';
import { HomeComponent } from '../home/home.component';
import { ApplyleaveComponent } from '../applyleave/applyleave.component';
import { AvailableleaveComponent } from '../availableleave/availableleave.component';
import { StatusComponent } from '../status/status.component';
import { HistoryComponent } from '../history/history.component';
import { DownloadFormComponent } from '../download-form/download-form.component';
import { SharedmoduleModule } from '../sharedmodule/sharedmodule.module';
import { FormsModule } from '@angular/forms';
import { UpcomingLeaveComponent } from '../upcoming-leave/upcoming-leave.component';
import { UserpageComponent } from '../userpage/userpage.component';



@NgModule({
  declarations: [
    HomeComponent,
    ApplyleaveComponent,
    AvailableleaveComponent,
    StatusComponent,
    HistoryComponent,
    DownloadFormComponent,
    UserpageComponent
  ],
  imports: [
    CommonModule,
    UsermoduleRoutingModule,
    SharedmoduleModule,
    FormsModule,
  ]
})
export class UsermoduleModule { }
