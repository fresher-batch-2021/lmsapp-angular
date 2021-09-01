import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LeaveAvailabilityService } from '../leave-availability.service';
import { UserService } from '../user-service';

@Component({
  selector: 'app-useraccess',
  templateUrl: './useraccess.component.html',
  styleUrls: ['./useraccess.component.css']
})
export class UseraccessComponent implements OnInit {
  requests: any;
  constructor(private toastr:ToastrService,
    private userService: UserService,
    private leaveAvailabilityService: LeaveAvailabilityService){}
  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    
    this.userService.listUsers().subscribe((res:any) => {
      let data = res;
      let request = data.rows;
      this.requests = request.filter((obj: any) => obj.doc.status == 'Waiting');
      console.log("success table list :", this.requests);
    },(err:any) => {
      console.log("failed : "+err);
      this.toastr.error("Error-Can't Load");
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

    this.userService.updateUser(request.doc._id, request.doc._rev, updatedUserData).subscribe((res:any) => {
      let data = res;
      console.log("response : ", data);
      requestStatus = 1;
      console.log("success");
      if (requestStatus == 1 && status == "Accepted") {
        this.leaveCountUpdation(request.doc.empId, request.doc.email, request.doc.role);
      } else {
        console.log("status : " + status)
        this.loadRequests();
      }
    },(err:any) => {
      console.log("failed"+err);
      this.toastr.error("Error-Can't Load");
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
    
    this.leaveAvailabilityService.addLeaveAvailability(postData).subscribe((res:any) => {
      let data = res;
      console.log("response : ", data);
      this.toastr.success("Leave balance added to Account");
      this.loadRequests();
    },(err:any) => {
      console.log(err);
      this.toastr.error("Error - Leave balance not added");
    });
  }
}
