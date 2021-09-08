import { Component, OnInit } from '@angular/core';
import { setClassMetadata } from '@angular/core/src/r3_symbols';
import { ToastrService } from 'ngx-toastr';
import { AvailabilityCheckService } from '../availability-check.service';
import { Leave } from '../leave';
import { LeaveFormService } from '../leave-form.service';
import { ValidatorService } from '../validator.service';

@Component({
  selector: 'app-sort-leave-form',
  templateUrl: './sort-leave-form.component.html',
  styleUrls: ['./sort-leave-form.component.css']
})
export class SortLeaveFormComponent implements OnInit {
  array!: any[];
  forms!: Leave[];
  leaveType!: string;
  date!: string;
  constructor(private leaveFormService: LeaveFormService,
    private availabilityCheckService: AvailabilityCheckService,
    private validatorService: ValidatorService,
    private toastr: ToastrService) {
    this.date = availabilityCheckService.currentDate();
    this.leaveFormService.listLeave().subscribe((res: any) => {
      let data = res;
      this.forms = data.rows.map((obj:any)=>obj.doc);
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
        if (form.leaveType == this.leaveType || this.leaveType == "allLeave") {
          console.log("form : " + form.fromDate);
          let fromDateArray = form.fromDate.split('-');
          let toDateArray = form.toDate.split('-');
          let todayArray = this.date.split('-');

          if (this.availabilityCheckService.isDateBetweenTwoDates(fromDateArray, toDateArray, todayArray)) {
            const result = {
              _id: form._id,
              _rev: form._rev,
              name: form.name,
              employeeId: form.employeeId,
              fromDate: form.fromDate,
              toDate: form.toDate,
              leaveType: form.leaveType,
              reason: form.reason,
              status: form.status,
              role: form.role,
              days: form.days,
              remarks: form.remarks
            }
            this.array.push(result);
          }
        }
      }
    }catch(err:any){
      this.toastr.error(err.message);
    }   
  }
}
