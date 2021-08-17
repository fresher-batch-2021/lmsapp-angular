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
import { FormsModule } from '@angular/forms';
import { StatusComponent } from './status/status.component';
import { HistoryComponent } from './history/history.component';
import { UpcomingLeaveComponent } from './upcoming-leave/upcoming-leave.component';
import { HrpageComponent } from './hrpage/hrpage.component';
import { EditleaveformComponent } from './editleaveform/editleaveform.component';
import { LogoutComponent } from './logout/logout.component';

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
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
