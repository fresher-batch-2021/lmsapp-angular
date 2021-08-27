import { Component, OnInit } from '@angular/core';
import { ApplyleaveComponent } from '../applyleave/applyleave.component';
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
  constructor() {
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
      //let errorMessage = err.response.data.errorMessage;
      //console.error(errorMessage);
      console.log("failed");
      alert("Error-Can't Load");
    });
  }

  statusUpdate(form: any,status: any) {
    const updatedForm = {
      "id": form.doc.eid,
      "name": form.doc.name,
      "employeeId": form.doc.empid,
      "role": form.doc.role,
      "days": form.doc.days,
      "fromDate": form.doc.fromDate,
      "toDate": form.doc.toDate,
      "leaveType": form.doc.leaveType,
      "reason": form.doc.reason,
      "status": status
    }
    const serviceObj = new LeaveFormService();
    serviceObj.updateLeaveStatus(updatedForm, form.doc.id, form.doc.rev).then(res => {
      let data = res.data;
      console.log("response : ", data);
      console.log("success");
      alert(" statusUpdate called Successfully !");
      this.leaveAvailabilityUpdate(form.doc.fromDate, form.doc.toDate, form.doc.leaveType, status, form.doc.empid);
      this.loadForms();
    }).catch(err => {
      //let errorMessage = err.response.data.errorMessage;
      //console.error(errorMessage);
      console.log("failed");
      alert("Error-can't Update");
    });
  }

  leaveAvailabilityUpdate(from_Date: any, to_Date: any, leaveType: any, status: any, empId: any) {
    if (status === "Approved") {
      let fromDate = new Date(from_Date);
      let toDate = new Date(to_Date);
      let difference = toDate.getTime() - fromDate.getTime();
      let days = (difference / (1000 * 3600 * 24)) + 1;
      const availabilityCheckService = new AvailabilityCheckService();
      let daysTaken = availabilityCheckService.isOfficialHolidaysBetweenLeaveDays(fromDate, toDate, days);
      const data = {
        selector: {
          "empId": empId
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
        this.leaveUpdate(data.docs[0]._id, data.docs[0]._rev, data.docs[0].total, data.docs[0].sickLeave, data.docs[0].casualLeave, data.docs[0].earnedLeave, data.docs[0].empId, data.docs[0].email, daysTaken, leaveType);
      }).catch(err => {
        //let errorMessage = err.response.data.errorMessage;
        //console.error(errorMessage);
        console.log("failed");
        alert("Error-Can't Load - get leaveAvailability for Updation");
      });

    }
  }
  leaveUpdate(id: any, rev: any, total: any, sickLeave: any, casualLeave: any, earnedLeave: any, empId: any, email: any, days: any, leaveType: any) {
    if (leaveType === "sickLeave") {
      console.log("leave : " + total, sickLeave, casualLeave, earnedLeave);
      sickLeave -= days;
      casualLeave = casualLeave;
      earnedLeave = earnedLeave;
      total -= days;
      console.log("leave : " + total, sickLeave, casualLeave, earnedLeave);
    }
    else if (leaveType === "casualLeave") {
      console.log("leave : " + total, sickLeave, casualLeave, earnedLeave);
      casualLeave -= days;
      sickLeave = sickLeave;
      earnedLeave = earnedLeave;
      total -= days;
      console.log("leave : " + total, sickLeave, casualLeave, earnedLeave);
    }
    else if (leaveType === "earnedLeave") {
      console.log("leave : " + total, sickLeave, casualLeave, earnedLeave);
      earnedLeave -= days;
      sickLeave = sickLeave;
      casualLeave = casualLeave;
      total -= days;
      console.log("leave : " + total, sickLeave, casualLeave, earnedLeave);
    }
    const updateddata = {
      "id": id,
      "total": total,
      "sickLeave": sickLeave,
      "casualLeave": casualLeave,
      "earnedLeave": earnedLeave,
      "empId": empId,
      "email": email
    }
    console.log("updatedData : " + updateddata.casualLeave, updateddata.sickLeave, updateddata.earnedLeave);
    const leaveAvailabilityService = new LeaveAvailabilityService();
    leaveAvailabilityService.updateLeaveAvailability(updateddata, rev, id).then(res => {
      let data = res.data;
      console.log("response : ", data);
      console.log("leaveAvailability Update success");
      //this.leaveUpdate(data.docs[0]._id,data.docs[0]._rev,data.docs[0].total,data.docs[0].sl,data.docs[0].cl,data.docs[0].el,data.docs[0].empId,data.docs[0].email,days,leaveType);
    }).catch(err => {
      //let errorMessage = err.response.data.errorMessage;
      //console.error(errorMessage);
      console.log("failed");
      alert("Error-Can't Load");
    });
  }
}
