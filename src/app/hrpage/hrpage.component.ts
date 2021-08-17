import { Component, OnInit } from '@angular/core';
import { LeaveFormService } from '../leave-form.service';

@Component({
  selector: 'app-hrpage',
  templateUrl: './hrpage.component.html',
  styleUrls: ['./hrpage.component.css']
})
export class HrpageComponent implements OnInit {
  forms: any;
  userName: any;
  constructor() {
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    let user = userStr != null ? JSON.parse(userStr) : null;
    this.userName = user[0].name;
    this.loadForms();
  }

  ngOnInit(): void {
  }

  loadForms(){
    const serviceObj = new LeaveFormService();
    serviceObj.listLeave().then(res => {
      let data = res.data;
      console.log("response : ", data);
      this.forms = data.rows;
      console.log("table list :", this.forms);
      console.log("available list :");
      console.log("success");
    }).catch(err => {
      //let errorMessage = err.response.data.errorMessage;
      //console.error(errorMessage);
      console.log("failed");
      alert("Error-Can't Load");
    });
  }
  leaveForms = [
    {
      name: "Renis",
      employeeId: "2855",
      team: "smart App",
      leaveDays: "08/08/2021",
      leaveType: "Sick Leave",
      reason: "Fever",
    },
    {
      name: "Casio",
      employeeId: "1448",
      team: "DataZap",
      leaveDays: "11/08/2021",
      leaveType: "Casual Leave",
      reason: "Function",
    },
  ];

  statusUpdate(id: any, rev: any, eid: any, empid: any, fromDate: any, toDate: any, leaveType: any, reason: any, status: any) {
    const updatedForm = {
      "id": eid,
      "employeeId": empid,
      "fromDate": fromDate,
      "toDate": toDate,
      "leaveType": leaveType,
      "reason": reason,
      "status": status
    }
    const serviceObj = new LeaveFormService();
    serviceObj.updateLeaveStatus(updatedForm,id,rev).then(res => {
      let data = res.data;
      console.log("response : ", data);
      console.log("success");
      alert("Updated Successfully !");
    }).catch(err => {
      //let errorMessage = err.response.data.errorMessage;
      //console.error(errorMessage);
      console.log("failed");
      alert("Error-can't Update");
    });
    this.loadForms();
  }
}
