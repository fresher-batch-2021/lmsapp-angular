import { Injectable } from '@angular/core';
import { LeaveAvailabilityService } from './leave-availability.service';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityCheckService {
  user: any;
  forms: any;
  constructor() {
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    this.user = userStr != null ? JSON.parse(userStr) : null;
    console.log("Name : ", this.user[0]._id);
    
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
    // let sl;
    // let cl;
    // let el;
    // let total;
    // for (let form of this.forms) {
    //   if (form.doc.email == this.user[0].email) {
    //     sl = form.doc.sickLeave;
    //     cl = form.doc.casualLeave;
    //     el = form.doc.earnedLeave;
    //     total = form.doc.total;
    //   }
    // }
    // if (type == "sickLeave") {
    //   if (sl < days) {
    //     throw new Error("Available Sick Leave " + sl + " Days");
    //   }
    // }
    // if (type == "casualLeave") {
    //   if (cl < days) {
    //     throw new Error("Available Sick Leave " + cl + " Days");
    //   }
    // }
    // if (type == "earnedLeave") {
    //   if (el < days) {
    //     throw new Error("Available Sick Leave " + el + " Days");
    //   }
    // }
  }

}
