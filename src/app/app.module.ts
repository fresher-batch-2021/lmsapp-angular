import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { InterceptorsService } from './interceptors.service';
import { UsermoduleModule } from './usermodule/usermodule.module';
import { SharedmoduleModule } from './sharedmodule/sharedmodule.module';
import { AdminmoduleModule } from './adminmodule/adminmodule.module';
import { DataTablesModule } from 'angular-datatables';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorInterceptor } from './error.interceptor';
import { UserpageComponent } from './userpage/userpage.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
  ],
  imports: [
    AdminmoduleModule,
    SharedmoduleModule,
    UsermoduleModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DataTablesModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({positionClass: "toast-top-center"})
  ],
  exports :[],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorsService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
}) 
export class AppModule { }
