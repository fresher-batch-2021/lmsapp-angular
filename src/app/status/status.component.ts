import { Component, OnInit } from '@angular/core';
import { LeaveAvailabilityService } from '../leave-availability.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  user: any;
  forms: any;
  constructor(private leaveAvailabilityService: LeaveAvailabilityService) {
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    this.user = userStr != null ? JSON.parse(userStr) : null;
    
    leaveAvailabilityService.getLeaveAvailability().subscribe((res:any) => {
      let data = res;
      this.forms = data.rows;
      console.log(" success table list :", this.forms);
    }),((err:any) => {
      console.log("failed : "+err);
      alert("Error-Can't Load");
    });
  }

  ngOnInit(): void {
    console.log("Status");
  }

}
