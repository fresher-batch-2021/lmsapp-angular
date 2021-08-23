import { Injectable } from '@angular/core';
import { HolidayService } from './holiday.service';
import { LeaveAvailabilityService } from './leave-availability.service';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityCheckService {
  user: any;
  forms: any;
  holidays:any;
  constructor() {
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    this.user = userStr != null ? JSON.parse(userStr) : null;
    console.log("Name : ", this.user[0]._id);
    const holidayService = new HolidayService();
    holidayService.listHolidays().then(res => {
      this.holidays = res.data.rows;
      console.log("holidayList : ",this.holidays);
    }).catch(err => {
      console.log("Can't load LeaveLists");
    })

  }

  isOfficialHolidaysBetweenLeaveDays(fromDate: any, days: any) {
    let date = new Date(fromDate);
    let value = date.getDay();
    console.log("Day : " + value);
    let leavedays = days;
    for (let i = 0; i < days; i++) {
      if (value == 6 || value == 0) {
        leavedays--;
      }
      if (value == 6) {
        value = 0;
      } else {
        value++;
      }
    }
    console.log("leavedays : " + leavedays);
    return leavedays;
  }

  isLeaveAvailable(type: any, days: number) {
    const leaveAvailabilityObj = new LeaveAvailabilityService();
    leaveAvailabilityObj.getLeaveAvailability().then(res => {
      let data = res.data;
      console.log("res : "+res);
      console.log("response : ", data);
      this.forms = data.rows;
      console.log("rows : ", this.forms);
      console.log("doc : "+this.forms.doc);
      //console.log("table list :", this.forms);
      console.log("success");
    }).catch(err => {
      console.log("failed");
      alert("Error-Can't Load");
    });
    let sl;
    let cl;
    let el;
    let total;
    for (let form of this.forms) {
      if (form.doc.email == this.user[0].email) {
        sl = form.doc.sickLeave;
        cl = form.doc.casualLeave;
        el = form.doc.earnedLeave;
        total = form.doc.total;
      }
    }
    if (type == "sickLeave") {
      if (sl < days) {
        throw new Error("Available Sick Leave " + sl + " Days");
      }
    }
    if (type == "casualLeave") {
      if (cl < days) {
        throw new Error("Available Sick Leave " + cl + " Days");
      }
    }
    if (type == "earnedLeave") {
      if (el < days) {
        throw new Error("Available Sick Leave " + el + " Days");
      }
    }
  }

}
