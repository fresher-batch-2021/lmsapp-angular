import { Component, OnInit } from '@angular/core';
import { AvailabilityCheckService } from '../availability-check.service';
import { LeaveAvailabilityService } from '../leave-availability.service';
import { LeaveFormService } from '../leave-form.service';
import { ValidatorService } from '../validator.service';

@Component({
  selector: 'app-applyleave',
  templateUrl: './applyleave.component.html',
  styleUrls: ['./applyleave.component.css']
})

export class ApplyleaveComponent implements OnInit {
  userStr: any = localStorage.getItem("LOGGED_IN_USER");
  user: any = this.userStr != null ? JSON.parse(this.userStr) : null;
  eId: any;
  forms: any;
  availableLeaveCount: any;
  constructor(private availabilityCheckService: AvailabilityCheckService) {
    console.log(this.user[0].empId);
    this.eId = this.user[0].empId;
    const leaveAvailabilityObj = new LeaveAvailabilityService();
    const getData = {
      selector: {
        "empId": this.eId
      },
      fields: ["total", "sickLeave", "casualLeave", "earnedLeave"]
    }
    leaveAvailabilityObj.getOneLeaveAvailability(getData).then(res => {
      let data = res.data;
      console.log("response : ", data);
      this.availableLeaveCount = data.docs[0];
      console.log("table list :", this.forms);
      console.log("success");
    }).catch(err => {
      console.log("failed");
      alert("Error-Can't Load");
    });
  }

  ngOnInit(): void {
  }

  getLeaveAvailability(type: String, days: number) {
    if (type == "sickLeave") {
      console.log("sl");
      if (this.availableLeaveCount.sickLeave < days) {
        console.log("sl");
        throw new Error("Available Sick Leave " + this.availableLeaveCount.sickLeave + " Days");
      }
    }
    if (type == "casualLeave") {
      console.log("cl");
      if (this.availableLeaveCount.casualLeave < days) {
        console.log("cl");
        throw new Error("Available Casual Leave " + this.availableLeaveCount.casualLeave + " Days");
      }
    }
    if (type == "earnedLeave") {
      console.log("el");
      if (this.availableLeaveCount.earnedLeave < days) {
        console.log("el");
        throw new Error("Available Earned Leave " + this.availableLeaveCount.earnedLeave + " Days");
      }
    }
  }

  employeeId: any;
  fromDate: any;
  toDate: any;
  type: any;
  reason: any;

  leaveForm() {
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    let user = userStr != null ? JSON.parse(userStr) : null;
    console.log("Name : ", user);
    const userId = user[0]._id;
    const leaveFormObj = {
      "name": user[0].name,
      "id": userId,
      "employeeId": user[0].empId,
      "role": user[0].role,
      "fromDate": this.fromDate,
      "toDate": this.toDate,
      "leaveType": this.type,
      "reason": this.reason,
      "status": "Pending"
    }

    try {
      const validatorService = new ValidatorService();
      const isLeaveAvailableService = new AvailabilityCheckService();
      let from = new Date(this.fromDate);
      let to = new Date(this.toDate);
      let difference = to.getTime() - from.getTime();
      let days = (difference / (1000 * 3600 * 24)) + 1;
      let daysTaken = isLeaveAvailableService.isOfficialHolidaysBetweenLeaveDays(this.fromDate, days);
      validatorService.isEmpty(this.user[0].empId, "Employee ID can't be empty");
      validatorService.isEmpty(this.fromDate, "From Date can't be empty");
      validatorService.isEmpty(this.toDate, "To Date can't be empty");
      validatorService.isEmpty(this.type, "LeaveType can't be empty");
      validatorService.isEmpty(this.reason, "Reason can't be empty");
      this.getLeaveAvailability(this.type, daysTaken);
      const serviceObj = new LeaveFormService;
      serviceObj.applyLeave(leaveFormObj).then(res => {
        let data = res.data;
        console.log("response : ", data);
        alert("Applied Succesfully");
        console.log("success");
        window.location.href = "/history";
      }).catch(err => {
        console.log("failed");
        alert("Error -");
      });

    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

}
