import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AvailabilityCheckService } from '../availability-check.service';
import { Availableleave } from '../availableleave';
import { Leave } from '../leave';
import { LeaveAvailabilityService } from '../leave-availability.service';
import { LeaveFormService } from '../leave-form.service';
import { User } from '../user';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { PendingleaveService } from '../pendingleave.service';

@Component({
  selector: 'app-hrpage',
  templateUrl: './hrpage.component.html',
  styleUrls: ['./hrpage.component.css']
})
export class HrpageComponent implements OnInit {
  cartCount = new BehaviorSubject<any>(this.loadForms());
  forms!: Leave[];
  userName!: string;
  user: User;
  searchResults!: Leave[];
  option: string = 'all';
  constructor(private toastr: ToastrService,
    private leaveFormService: LeaveFormService,
    private availabilityCheckService: AvailabilityCheckService,
    private leaveAvailabilityService: LeaveAvailabilityService,
    private ngxspinner : NgxSpinnerService,
    private pendingLeaveService : PendingleaveService) {
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    this.user = userStr != null ? JSON.parse(userStr) : null;
    this.userName = this.user.name;
    this.loadForms();
  }

  ngOnInit(): void {
    this.ngxspinner.show();
    setTimeout(()=>{this.ngxspinner.hide()},1000)
    this.sortForms('all');
  }

  sortForms(choice: any) {
    this.option = choice;
    console.log(this.option);
    if (this.option == "Pending") { 
      this.searchResults = this.forms.filter((obj: any) => obj.status == 'Pending');
    } else if (this.option == "Approved") {
      this.searchResults = this.forms.filter((obj: any) => obj.status == 'Approved');
    } else if (this.option == "Declined") {
      this.searchResults = this.forms.filter((obj: any) => obj.status == 'Declined');
    } else {
      this.searchResults = this.forms;
    }
  }


  loadForms() {
    this.leaveFormService.listLeave().subscribe((res:any) => {
      let data = res;
      this.forms = data.rows.map((obj:any)=>obj.doc);
      this.searchResults = this.forms;
      console.log("table list :", this.forms);
      this.getPending();
    },(err:any) => {
      console.log(err);
      this.toastr.error("Error-Can't Load");
    });
  }

  getPending(){
    let searchResult = this.forms.filter((obj: any) => obj.status == 'Pending');
    console.log("length : "+searchResult.length)
    localStorage.setItem("PENDING_LEAVE",JSON.stringify(searchResult))
    this.pendingLeaveService.pendingLeave();
  }
  statusUpdate(form: any, status: any) {
    if (status == "Approved") {
      const updatedForm = {
        "name": form.name,
        "employeeId": form.employeeId,
        "role": form.role,
        "days": form.days,
        "fromDate": form.fromDate,
        "toDate": form.toDate,
        "leaveType": form.leaveType,
        "reason": form.reason,
        "status": status,
        "remarks" : "Approved"
      }
      const leaveObj = new Leave();
      leaveObj.setData(updatedForm);
      this.leaveFormService.updateLeaveStatus(leaveObj, form._id, form._rev).subscribe((res:any) => {
        let data = res;
        this.toastr.success("Status Updated!");
        const availabilityData = {
          'from_Date': form.fromDate,
          'to_Date': form.toDate,
          'leaveType': form.leaveType,
          'status': status,
          'empId': form.empId
        }
        this.leaveAvailabilityUpdate(availabilityData);
        this.loadForms();

      },(err:any) => {
        console.log(err);
        this.toastr.success("Error-can't Update");
      });
    }else{
      let reason = prompt("Enter Reason");
      console.log(reason);
      const updatedForm = {
        "name": form.name,
        "employeeId": form.employeeId,
        "role": form.role,
        "days": form.days,
        "fromDate": form.fromDate,
        "toDate": form.toDate,
        "leaveType": form.leaveType,
        "reason": form.reason,
        "status": status,
        "remarks" : reason
      }
      const leaveObj = new Leave();
      leaveObj.setData(updatedForm);
      this.leaveFormService.updateLeaveStatus(leaveObj, form._id, form._rev).subscribe((res:any) => {
        let data = res;
        this.toastr.success("Updated!!"+data);
        this.loadForms();
      },(err:any) => {
        console.log(err);
        this.toastr.error("Error-can't Update");
      });
    }
  }

  leaveAvailabilityUpdate(datas: { from_Date: any; to_Date: any; leaveType: any; status: any; empId: any; }) {
    if (datas.status === "Approved") {
      let fromDate = new Date(datas.from_Date);
      let toDate = new Date(datas.to_Date);
      let difference = toDate.getTime() - fromDate.getTime();
      let days = (difference / (1000 * 3600 * 24)) + 1;
      let daysTaken = this.availabilityCheckService.isOfficialHolidaysBetweenLeaveDays(fromDate, toDate, days);
      const getData = {
        selector: {
          "empId": datas.empId
        },
        fields: ["_id", "_rev", "total", "sickLeave", "casualLeave", "earnedLeave", "empId", "email"]
      }
      let leaveCount;
      console.log("data : " + this.user.email, this.user.empId);
      this.leaveAvailabilityService.getOneLeaveAvailability(getData).subscribe((res:any) => {
        let data = res;
        leaveCount = data.docs[0];
        console.log("Leave Availability list :", leaveCount);
        const leaveUpdateData = {
          'id': leaveCount._id,
          'rev': leaveCount._rev,
          'total': leaveCount.total,
          'sickLeave': leaveCount.sickLeave,
          'casualLeave': leaveCount.casualLeave,
          'earnedLeave': leaveCount.earnedLeave,
          'empId': leaveCount.empId,
          'email': leaveCount.email,
          'daysTaken': daysTaken,
          'leaveType': datas.leaveType
        }
        this.leaveUpdate(leaveUpdateData);
      },(err:any) => {
        console.log(err);
        alert("Error-Can't Load - get leaveAvailability for Updation");
      });
    }
  }
  leaveUpdate(datas: { id: any; rev: any; total: any; sickLeave: any; casualLeave: any; earnedLeave: any; empId: any; email: any; daysTaken: any; leaveType: any; }) {
    if (datas.leaveType === "sickLeave") {
      datas.sickLeave -= datas.daysTaken;
      datas.total -= datas.daysTaken;
    }
    else if (datas.leaveType === "casualLeave") {
      datas.casualLeave -= datas.daysTaken;
      datas.total -= datas.daysTaken;
    }
    else if (datas.leaveType === "earnedLeave") {
      datas.earnedLeave -= datas.daysTaken;
      datas.total -= datas.daysTaken;
    }
    const updateddata = {
      "id": datas.id,
      "total": datas.total,
      "sickLeave": datas.sickLeave,
      "casualLeave": datas.casualLeave,
      "earnedLeave": datas.earnedLeave,
      "empId": datas.empId,
      "email": datas.email
    }
    console.log("updatedData : " + updateddata.casualLeave, updateddata.sickLeave, updateddata.earnedLeave);
    const available = new Availableleave();
    available.setData(updateddata);
    this.leaveAvailabilityService.updateLeaveAvailability(available, datas.rev, datas.id).subscribe((res:any) => {
      let data = res;
      console.log("response : ", data);
      console.log("leaveAvailability Update success");
    },(err:any) => {
      console.log(err.data);
      alert("Error-Can't Load");
    });
  }
}
