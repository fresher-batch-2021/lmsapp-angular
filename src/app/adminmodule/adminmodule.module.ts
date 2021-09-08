import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminmoduleRoutingModule } from './adminmodule-routing.module';
import { HrmHomeComponent } from '../hrm-home/hrm-home.component';
import { HrpageComponent } from '../hrpage/hrpage.component';
import { SortLeaveFormComponent } from '../sort-leave-form/sort-leave-form.component';
import { UseraccessComponent } from '../useraccess/useraccess.component';
import { UserlistComponent } from '../userlist/userlist.component';
import { LeaveAnalysisComponent } from '../leave-analysis/leave-analysis.component';
import { SharedmoduleModule } from '../sharedmodule/sharedmodule.module';
import { FormsModule } from '@angular/forms';
import { HrmheaderComponent } from '../hrmheader/hrmheader.component';
import { ChartsModule } from 'ng2-charts';
import { HolidaysComponent } from '../holidays/holidays.component';
import { UpcomingLeaveComponent } from '../upcoming-leave/upcoming-leave.component';
import { SearchPipe } from '../search.pipe';
import { DataTablesModule } from 'angular-datatables';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    HrmheaderComponent,
    HrmHomeComponent,
    HrpageComponent,
    SortLeaveFormComponent,
    UseraccessComponent,
    UserlistComponent,
    LeaveAnalysisComponent,
    HolidaysComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    SharedmoduleModule,
    AdminmoduleRoutingModule,
    FormsModule,
    DataTablesModule,
    ChartsModule,
    NgxSpinnerModule
  ],
  exports:[],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminmoduleModule { }
