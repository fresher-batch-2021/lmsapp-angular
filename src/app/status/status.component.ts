import { Component, OnInit } from '@angular/core';
import { Availableleave } from '../availableleave';
import { LeaveAvailabilityService } from '../leave-availability.service';
import { User } from '../user';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  user: User;
  forms!: Availableleave[];
  constructor(private leaveAvailabilityService: LeaveAvailabilityService) {
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    this.user = userStr != null ? JSON.parse(userStr) : null;
    
    leaveAvailabilityService.getLeaveAvailability().subscribe((res:any) => {
      let data = res;
      this.forms = data.rows.map((obj:any)=> obj.doc);
      console.log(" success table list :", this.forms);
    },(err:any) => {
      console.log("failed : "+err);
      alert("Error-Can't Load");
    });
  }

  ngOnInit(): void {
    console.log("Status");
  }

}
