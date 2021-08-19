import { Component, OnInit } from '@angular/core';
import axios from 'axios';
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

  eId : any;

  constructor() {
    
    console.log(this.user[0].empId);
    this.eId = this.user[0].empId;
  }


  ngOnInit(): void {
  }
  
  employeeId: any;
  fromDate: any;
  toDate: any;
  type: any;
  reason: any;

  leaveForm() {
    console.log("renis");
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    let user = userStr != null ? JSON.parse(userStr) : null;
    console.log("Name : ", user);
    const userId = user[0]._id;
    const leaveFormObj = {
      "name": user[0].name,
      "id": userId,
      "employeeId": user[0].empId,
      "fromDate": this.fromDate,
      "toDate": this.toDate,
      "leaveType": this.type,
      "reason": this.reason,
      "status": "Pending"
    }
    
    try{
      const validatorService = new ValidatorService();
      validatorService.isEmpty(this.user[0].empId, "Employee ID can't be empty");
      validatorService.isEmpty(this.fromDate, "From Date can't be empty");
      validatorService.isEmpty(this.toDate, "To Date can't be empty");
      validatorService.isEmpty(this.type, "LeaveType can't be empty");
      validatorService.isEmpty(this.reason, "Reason can't be empty");
      
      const serviceObj = new LeaveFormService;
      serviceObj.applyLeave(leaveFormObj).then(res => {
        let data = res.data;
        console.log("response : ", data);
        alert("Applied Succesfully");
        console.log("success");
        window.location.href = "/history";
      }).catch(err => {
        console.log("failed");
        alert("Error - ");
      });

    }catch(err){
      console.log(err);
      alert(err.message);
    }
  }
  
}
