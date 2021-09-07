import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { HrmheaderComponent } from '../hrmheader/hrmheader.component';
import { RouterModule } from '@angular/router';
import { SearchPipe } from '../search.pipe';
import { UpcomingLeaveComponent } from '../upcoming-leave/upcoming-leave.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    UpcomingLeaveComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    UpcomingLeaveComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedmoduleModule { }
