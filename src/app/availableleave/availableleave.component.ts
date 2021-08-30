import { Component, OnInit } from '@angular/core';
import { LeaveAvailabilityService } from '../leave-availability.service';

@Component({
  selector: 'app-availableleave',
  templateUrl: './availableleave.component.html',
  styleUrls: ['./availableleave.component.css']
})
export class AvailableleaveComponent implements OnInit {
  user:any;
  forms:any;
  constructor() { 
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    this.user = userStr != null ? JSON.parse(userStr) : null;
    console.log("Name : ", this.user[0]._id);
    const leaveAvailabilityObj = new LeaveAvailabilityService();
    leaveAvailabilityObj.getLeaveAvailability().then(res => {
      let data = res.data;
      console.log("response : ", data);
      this.forms = data.rows;
      console.log("table list :", this.forms);
      console.log("success");
    }).catch(err => {
      console.log("failed");
      alert("Error-Can't Load");
    });
  }

  ngOnInit(): void {
    console.log("Available Leave");
  }

}
