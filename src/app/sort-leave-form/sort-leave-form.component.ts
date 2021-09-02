import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AvailabilityCheckService } from '../availability-check.service';
import { LeaveFormService } from '../leave-form.service';
import { ValidatorService } from '../validator.service';

@Component({
  selector: 'app-sort-leave-form',
  templateUrl: './sort-leave-form.component.html',
  styleUrls: ['./sort-leave-form.component.css']
})
export class SortLeaveFormComponent implements OnInit {
  array: any;
  forms: any;
  leaveType: any;
  date: any
  constructor(private leaveFormService: LeaveFormService,
    private availabilityCheckService: AvailabilityCheckService,
    private validatorService: ValidatorService,
    private toastr: ToastrService) {
    this.date = availabilityCheckService.currentDate();
    this.leaveFormService.listLeave().subscribe((res: any) => {
      let data = res;
      this.forms = data.rows;
      console.log("success Leave list :", this.forms);
    }, (err: any) => {
      console.log("failed" + err);
      alert("Error-Can't Load");
    });
  }

  ngOnInit(): void {
    console.log("Sort Leave");
  }
  getStyle(status: any) {
    let statusClr;
    console.log("status", status);
    if (status == "Declined") {
      statusClr = "red";
    }
    else if (status == "Approved") {
      statusClr = "Green"
    }
    else {
      statusClr = "orange";
    }
    return statusClr;
  }


  filter() {
    try {
      this.validatorService.isEmpty(this.leaveType, "Leave Type Can't be Empty");
      console.log(this.leaveType);
      this.array = [];
      for (let form of this.forms) {
        console.log(form);
        if (form.doc.leaveType == this.leaveType || this.leaveType == "allLeave") {
          console.log("form : " + form.doc.fromDate);
          let fromDateArray = form.doc.fromDate.split('-');
          let toDateArray = form.doc.toDate.split('-');
          let todayArray = this.date.split('-');

          if (this.availabilityCheckService.isDateBetweenTwoDates(fromDateArray, toDateArray, todayArray)) {
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
    }catch(err){
      this.toastr.error(err.message);
    }   
  }
}
