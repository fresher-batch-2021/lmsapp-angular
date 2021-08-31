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
  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    const serviceObj = new UserService();
    serviceObj.listUsers().then(res => {
      let data = res.data;
      console.log("response : ", data);
      let request = data.rows;
      this.requests = request.filter((obj: any) => obj.doc.status == 'Waiting');
      console.log("table list :", this.requests);
      console.log("success");
    }).catch(err => {
      console.log("failed : "+err.data);
      alert("Error-Can't Load");
    });
  }

  acceptanceStatus(request: any,status: any) {
    let requestStatus = 0;
    const updatedUserData = {
      name: request.doc.name,
      empId: request.doc.empId,
      role: request.doc.role,
      mobileNumber: request.doc.mobileNumber,
      email: request.doc.email,
      password: request.doc.password,
      status: status
    }

    const serviceObj = new UserService();
    serviceObj.updateUser(request.doc._id, request.doc._rev, updatedUserData).then(res => {
      let data = res.data;
      console.log("response : ", data);
      requestStatus = 1;
      console.log("success");
      if (requestStatus == 1 && status == "Accepted") {
        this.leaveCountUpdation(request.doc.empId, request.doc.email, request.doc.role);
      } else {
        console.log("status : " + status)
        this.loadRequests();
      }
    }).catch(err => {
      console.log("failed");
      alert("Error-Can't Load");
    });


  }

  leaveCountUpdation(employeeId: any, email: any, role: any) {
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
    let postData = {
      'total': total,
      'sickLeave': sl,
      'casualLeave': cl,
      'earnedLeave': el,
      'empId': employeeId,
      'email': email,
      'role': role
    }
    console.log("leave date : " + postData);
    const leaveAvailabilityObj = new LeaveAvailabilityService();
    leaveAvailabilityObj.addLeaveAvailability(postData).then(res => {
      let data = res.data;
      console.log("response : ", data);
      alert("Leave balance added to Account");
      this.loadRequests();
    }).catch(err => {
      console.log(err.data);
      alert("Error - unable to Register");
    });
  }
}
