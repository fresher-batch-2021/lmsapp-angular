import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Availableleave } from '../availableleave';
import { LeaveAvailabilityService } from '../leave-availability.service';
import { User } from '../user';
import { UserService } from '../user-service';

@Component({
  selector: 'app-useraccess',
  templateUrl: './useraccess.component.html',
  styleUrls: ['./useraccess.component.css']
})
export class UseraccessComponent implements OnInit {
  requests!: User[];
  constructor(private toastr:ToastrService,
    private userService: UserService,
    private leaveAvailabilityService: LeaveAvailabilityService){}
  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    
    this.userService.listUsers().subscribe((res:any) => {
      let data = res;
      let request = data.rows.map((obj:any)=> obj.doc);
      this.requests = request.filter((obj: any) => obj.status == 'Waiting');
      console.log("success table list :", this.requests);
    },(err:any) => {
      console.log("failed : "+err);
      this.toastr.error("Error-Can't Load");
    });
  }

  acceptanceStatus(request: any,status: any) {
    let requestStatus = 0;
    const updatedUserData = {
      name: request.name,
      empId: request.empId,
      role: request.role,
      mobileNumber: request.mobileNumber,
      email: request.email,
      password: request.password,
      status: status
    }
    const user = new User();
    user.setData(updatedUserData);
    this.userService.updateUser(request._id, request._rev, user).subscribe((res:any) => {
      let data = res;
      console.log("response : ", data);
      requestStatus = 1;
      console.log("success");
      if (requestStatus == 1 && status == "Accepted") {
        this.leaveCountUpdation(request.empId, request.email, request.role);
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
      'empId': employeeId,
      'email': email,
      'role': role,
      'total': total,
      'sickLeave': sl,
      'casualLeave': cl,
      'earnedLeave': el
    }
    console.log("leave date : " + postData);
    const availableObj = new Availableleave();
    availableObj.setData(postData);
    this.leaveAvailabilityService.addLeaveAvailability(availableObj).subscribe((res:any) => {
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
