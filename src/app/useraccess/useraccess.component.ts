import { Component, OnInit } from '@angular/core';
import { LeaveAvailabilityService } from '../leave-availability.service';
import { UserService } from '../user-service';

@Component({
  selector: 'app-useraccess',
  templateUrl: './useraccess.component.html',
  styleUrls: ['./useraccess.component.css']
})
export class UseraccessComponent implements OnInit {
  requests: any;
  constructor() { }

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    const serviceObj = new UserService();
    serviceObj.listUsers().then(res => {
      let data = res.data;
      console.log("response : ", data);
      this.requests = data.rows;
      console.log("table list :", this.requests);
      console.log("success");
    }).catch(err => {
      console.log("failed");
      alert("Error-Can't Load");
    });
  }

  acceptanceStatus(id: any, rev: any, name: any, employeeId: any, role: any, mobileNumber: any, email: any, password: any, status: any) {
    let requestStatus = 0;
    const updatedUserData = {
      name: name,
      empId: employeeId,
      role: role,
      mobileNumber: mobileNumber,
      email: email,
      password: password,
      status: status
    }

    const serviceObj = new UserService();
    serviceObj.updateUser(id, rev, updatedUserData).then(res => {
      let data = res.data;
      console.log("response : ", data);
      requestStatus = 1;
      console.log("success");
      if (requestStatus == 1 && status == "Accepted") {
        this.leaveCountUpdation(employeeId, email);
      } else {
        console.log("status : " + status)
      }
    }).catch(err => {
      console.log("failed");
      alert("Error-Can't Load");
    });


  }

  leaveCountUpdation(employeeId: any, email: any) {
    let today = new Date();
    let thisMonth = String(today.getMonth() + 1).padStart(2, '0');
    let sl, cl, el, total;
    if (thisMonth[0] == '0') {
      let month = parseInt(thisMonth[1]);
      sl = 13 - month;
      cl = 13 - month;
      el = 13 - month;
      total = sl + cl + el;
    } else {
      let month = parseInt(thisMonth);
      sl = 13 - month;
      cl = 13 - month;
      el = 13 - month;
      total = sl + cl + el;
    }
    let data = {
      'total': total,
      'sickLeave': sl,
      'casualLeave': cl,
      'earnedLeave': el,
      'empId': employeeId,
      'email': email
    }
    console.log("leave date : " + data);
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