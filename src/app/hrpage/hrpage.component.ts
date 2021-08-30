import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AvailabilityCheckService } from '../availability-check.service';
import { LeaveAvailabilityService } from '../leave-availability.service';
import { LeaveFormService } from '../leave-form.service';

@Component({
  selector: 'app-hrpage',
  templateUrl: './hrpage.component.html',
  styleUrls: ['./hrpage.component.css']
})
export class HrpageComponent implements OnInit {
  forms: any;
  userName: any;
  user: any;
  searchResults: any;
  option: any = 'all';
  constructor(private toastr: ToastrService) {
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    this.user = userStr != null ? JSON.parse(userStr) : null;
    this.userName = this.user[0].name;
    this.loadForms();
  }

  ngOnInit(): void {
    this.sortForms('all');
  }

  sortForms(n: any) {
    this.option = n;
    console.log(this.option);
    if (this.option == "Pending") {
      this.searchResults = this.forms.filter((obj: any) => obj.doc.status == 'Pending');
    } else if (this.option == "Approved") {
      this.searchResults = this.forms.filter((obj: any) => obj.doc.status == 'Approved');
    } else if (this.option == "Declined") {
      this.searchResults = this.forms.filter((obj: any) => obj.doc.status == 'Declined');
    } else {
      this.searchResults = this.forms;
    }
  }


  loadForms() {
    const serviceObj = new LeaveFormService();
    serviceObj.listLeave().then(res => {
      let data = res.data;
      console.log("response : ", data);
      this.forms = data.rows;
      this.searchResults = this.forms;
      console.log("table list :", this.forms);
      console.log("success");
    }).catch(err => {
      console.log(err.data);
      this.toastr.error("Error-Can't Load");
    });
  }

  statusUpdate(form: any, status: any) {

    if (status == "Approved") {
      const updatedForm = {
        "name": form.doc.name,
        "employeeId": form.doc.employeeId,
        "role": form.doc.role,
        "days": form.doc.days,
        "fromDate": form.doc.fromDate,
        "toDate": form.doc.toDate,
        "leaveType": form.doc.leaveType,
        "reason": form.doc.reason,
        "status": status,
        "remarks" : "Approved"
      }
      const serviceObj = new LeaveFormService();
      serviceObj.updateLeaveStatus(updatedForm, form.doc._id, form.doc._rev).then(res => {
        let data = res.data;
        console.log("response : ", data);
        console.log("success");
        this.toastr.success("Status Updated!");
        const availabilityData = {
          'from_Date': form.doc.fromDate,
          'to_Date': form.doc.toDate,
          'leaveType': form.doc.leaveType,
          'status': status,
          'empId': form.doc.empId
        }
        this.leaveAvailabilityUpdate(availabilityData);
        this.loadForms();

      }).catch(err => {
        console.log(err.data);
        this.toastr.success("Error-can't Update");
      });
    }else{
      let reason = prompt("Enter Reason");
      console.log(reason);
      const updatedForm = {
        "name": form.doc.name,
        "employeeId": form.doc.employeeId,
        "role": form.doc.role,
        "days": form.doc.days,
        "fromDate": form.doc.fromDate,
        "toDate": form.doc.toDate,
        "leaveType": form.doc.leaveType,
        "reason": form.doc.reason,
        "status": status,
        "remarks" : reason
      }
      const serviceObj = new LeaveFormService();
      serviceObj.updateLeaveStatus(updatedForm, form.doc._id, form.doc._rev).then(res => {
        let data = res.data;
        console.log("response : ", data);
        console.log("success");
        this.toastr.success("Updated!!");
        this.loadForms();
      }).catch(err => {
        console.log(err.data);
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
      const availabilityCheckService = new AvailabilityCheckService();
      let daysTaken = availabilityCheckService.isOfficialHolidaysBetweenLeaveDays(fromDate, toDate, days);
      const data = {
        selector: {
          "empId": datas.empId
        },
        fields: ["_id", "_rev", "total", "sickLeave", "casualLeave", "earnedLeave", "empId", "email"]
      }
      let leaveCount;
      console.log("data : " + this.user[0].email, this.user[0].empId);
      const leaveAvailabilityService = new LeaveAvailabilityService();
      leaveAvailabilityService.getOneLeaveAvailability(data).then(res => {
        let data = res.data;
        console.log("response : ", data);
        leaveCount = data.docs;
        console.log("Leave Availability list :", leaveCount);
        console.log("success");
        const leaveUpdateData = {
          'id': data.docs[0]._id,
          'rev': data.docs[0]._rev,
          'total': data.docs[0].total,
          'sickLeave': data.docs[0].sickLeave,
          'casualLeave': data.docs[0].casualLeave,
          'earnedLeave': data.docs[0].earnedLeave,
          'empId': data.docs[0].empId,
          'email': data.docs[0].email,
          'daysTaken': daysTaken,
          'leaveType': datas.leaveType
        }
        this.leaveUpdate(leaveUpdateData);
      }).catch(err => {
        console.log(err.data);
        alert("Error-Can't Load - get leaveAvailability for Updation");
      });

    }
  }
  leaveUpdate(datas: { id: any; rev: any; total: any; sickLeave: any; casualLeave: any; earnedLeave: any; empId: any; email: any; daysTaken: any; leaveType: any; }) {
    if (datas.leaveType === "sickLeave") {
      console.log("leave : " + datas.total, datas.sickLeave, datas.casualLeave, datas.earnedLeave);
      datas.sickLeave -= datas.daysTaken;
      datas.total -= datas.daysTaken;
      console.log("leave : " + datas.total, datas.sickLeave, datas.casualLeave, datas.earnedLeave);
    }
    else if (datas.leaveType === "casualLeave") {
      console.log("leave : " + datas.total, datas.sickLeave, datas.casualLeave, datas.earnedLeave);
      datas.casualLeave -= datas.daysTaken;
      datas.total -= datas.daysTaken;
      console.log("leave : " + datas.total, datas.sickLeave, datas.casualLeave, datas.earnedLeave);
    }
    else if (datas.leaveType === "earnedLeave") {
      console.log("leave : " + datas.total, datas.sickLeave, datas.casualLeave, datas.earnedLeave);
      datas.earnedLeave -= datas.daysTaken;
      datas.total -= datas.daysTaken;
      console.log("leave : " + datas.total, datas.sickLeave, datas.casualLeave, datas.earnedLeave);
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
    const leaveAvailabilityService = new LeaveAvailabilityService();
    leaveAvailabilityService.updateLeaveAvailability(updateddata, datas.rev, datas.id).then(res => {
      let data = res.data;
      console.log("response : ", data);
      console.log("leaveAvailability Update success");
    }).catch(err => {
      console.log(err.data);
      alert("Error-Can't Load");
    });
  }
}
