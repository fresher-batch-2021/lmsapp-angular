import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { ApplyleaveComponent } from './applyleave/applyleave.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusComponent } from './status/status.component';
import { HistoryComponent } from './history/history.component';
import { UpcomingLeaveComponent } from './upcoming-leave/upcoming-leave.component';
import { HrpageComponent } from './hrpage/hrpage.component';
import { EditleaveformComponent } from './editleaveform/editleaveform.component';
import { LogoutComponent } from './logout/logout.component';
import { HrmheaderComponent } from './hrmheader/hrmheader.component';
import { HrmHomeComponent } from './hrm-home/hrm-home.component';
import { LeaveAnalysisComponent } from './leave-analysis/leave-analysis.component';
import { DownloadFormComponent } from './download-form/download-form.component';
import { SortLeaveFormComponent } from './sort-leave-form/sort-leave-form.component';
import { AvailableleaveComponent } from './availableleave/availableleave.component';
import { UseraccessComponent } from './useraccess/useraccess.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { UserlistComponent } from './userlist/userlist.component';
import { SearchPipe } from './search.pipe';
import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    ApplyleaveComponent,
    RegisterComponent,
    StatusComponent,
    HistoryComponent,
    UpcomingLeaveComponent,
    HrpageComponent,
    EditleaveformComponent,
    LogoutComponent,
    HrmheaderComponent,
    HrmHomeComponent,
    LeaveAnalysisComponent,
    DownloadFormComponent,
    SortLeaveFormComponent,
    AvailableleaveComponent,
    UseraccessComponent,
    HolidaysComponent,
    UserlistComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({positionClass: "toast-top-center"})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
