import { Component, OnInit } from '@angular/core';
import { LeaveAvailabilityService } from '../leave-availability.service';
import { UserService } from '../user-service';

@Component({
  selector: 'app-useraccess',
  templateUrl: './useraccess.component.html',
  styleUrls: ['./useraccess.component.css']
})
export class UseraccessComponent implements OnInit {
  requests:any;
  constructor() { }

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(){
    const serviceObj = new UserService();
    serviceObj.listUsers().then(res => {
      let data = res.data;
      console.log("response : ", data);
      this.requests = data.rows;
      console.log("table list :", this.requests);
      console.log("available list :");
      console.log("success");
    }).catch(err => {
      console.log("failed");
      alert("Error-Can't Load");
    });
  }

  acceptanceStatus(id: any,rev: any,name: any,employeeId: any,role: any,mobileNumber: any,email: any,password: any,status: any){
    let requestStatus = 0;
    const updatedUserData = {
      name : name,
      empId : employeeId,
      role : role,
      mobileNumber : mobileNumber,
      email : email,
      password : password,
      status : status
    }

    const serviceObj = new UserService();
    serviceObj.updateUser(id,rev,updatedUserData).then(res => {
      let data = res.data;
      console.log("response : ", data);
      requestStatus = 1;
      console.log("success");
    }).catch(err => {
      console.log("failed");
      alert("Error-Can't Load");
    });

    if(requestStatus === 1 && status === 'Accepted'){
      this.leaveCountUpdation(employeeId,email);
    }
  }

  leaveCountUpdation(employeeId: any,email: any){
    let data = {
      total: 18,
      sickLeave: 6,
      casualLeave: 6,
      earnedLeave: 6,
      empId: employeeId,
      email: email
    }
    const leaveAvailabilityObj = new LeaveAvailabilityService();
    leaveAvailabilityObj.addLeaveAvailability(data).then(res => {
      let data = res.data;
      console.log("response : ", data);
      alert("Leave balance added to Account");
      this.loadRequests();
    }).catch(err => {
      alert("Error - unable to Register");
    });
  }
}
