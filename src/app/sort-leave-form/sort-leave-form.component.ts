import { Component, OnInit } from '@angular/core';
import { AvailabilityCheckService } from '../availability-check.service';
import { LeaveFormService } from '../leave-form.service';

@Component({
  selector: 'app-sort-leave-form',
  templateUrl: './sort-leave-form.component.html',
  styleUrls: ['./sort-leave-form.component.css']
})
export class SortLeaveFormComponent implements OnInit {
  array: any;
  forms: any;
  constructor() {
    const leaveFormService = new LeaveFormService();
    leaveFormService.listLeave().then(res => {
      let data = res.data;
      console.log("response : ", data);
      this.forms = data.rows;
      console.log("Leave list :", this.forms);
      console.log("success");
    }).catch(err => {
      //let errorMessage = err.response.data.errorMessage;
      //console.error(errorMessage);
      console.log("failed");
      alert("Error-Can't Load");
    });
  }

  ngOnInit(): void {
  }

  

  leaveType: any;
  date: any;
  filter() {
    this.array = [];
    for (let form of this.forms) {
      console.log(form);
      if (form.doc.leaveType == this.leaveType || this.leaveType == "allLeave") {
        console.log("form : " + form.doc.fromDate);
        let fromDateArray = form.doc.fromDate.split('-');
        let toDateArray = form.doc.toDate.split('-');
        let todayArray = this.date.split('-');
        // fromDateArray.reverse();
        // toDateArray.reverse();
        // todayArray.reverse();
        const cheackAvailability = new AvailabilityCheckService();
        if (cheackAvailability.isDateBetweenTwoDates(fromDateArray,toDateArray,todayArray)) {
          const result = {
            name: form.doc.name,
            employeeId: form.doc.employeeId,
            fromDate: form.doc.fromDate,
            toDate: form.doc.toDate,
            leaveType: form.doc.leaveType,
            reason: form.doc.reason,
            status: form.doc.status
          }
          this.array.push(result);
        }
      }
    }
    console.log("Array : " + this.array[0].fromDate);
  }
}
