import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AvailabilityCheckService } from '../availability-check.service';
import { Leave } from '../leave';
import { LeaveAvailabilityService } from '../leave-availability.service';
import { LeaveFormService } from '../leave-form.service';
import { UserService } from '../user-service';
import { ValidatorService } from '../validator.service';

@Component({
  selector: 'app-applyleave',
  templateUrl: './applyleave.component.html',
  styleUrls: ['./applyleave.component.css'],
})
export class ApplyleaveComponent implements OnInit {

@ViewChild('id') id!:ElementRef<HTMLInputElement>;

  userStr: any = localStorage.getItem('LOGGED_IN_USER');
  user: any = this.userStr != null ? JSON.parse(this.userStr) : null;
  eId: any;
  forms: any;
  availableLeaveCount: any;
  employeeId: any;
  fromDate: any;
  toDate: any;
  type: any;
  reason: any;
  constructor(
    private toastr: ToastrService,
    private validatorService: ValidatorService,
    private userService: UserService,
    private leaveFormService: LeaveFormService,
    private isLeaveAvailableService: AvailabilityCheckService,
    private leaveAvailabilityService: LeaveAvailabilityService
  ) {

    console.log("eleref", this.id);
    this.fromDate = isLeaveAvailableService.currentDate();
    this.toDate = isLeaveAvailableService.currentDate();
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.eId = this.user[0].empId;
    const getData = {
      selector: {
        empId: this.eId,
      },
      fields: ['total', 'sickLeave', 'casualLeave', 'earnedLeave'],
    };
    this.leaveAvailabilityService.getOneLeaveAvailability(getData).subscribe(
      (res: any) => {
        let data = res;
        console.log('response : ', data);
        this.availableLeaveCount = res.docs[0];
        console.log('table list :', this.availableLeaveCount);
      },
      (err: any) => {
        console.log('failed');
        this.toastr.error("Error-Can't Load");
      }
    );
  }

  getLeaveAvailability(type: string, days: number) {
    if (type == 'sickLeave') {
      if (this.availableLeaveCount.sickLeave < days) {
        throw new Error(
          'Available Sick Leave ' + this.availableLeaveCount.sickLeave + ' Days'
        );
      }
    }
    if (type == 'casualLeave') {
      if (this.availableLeaveCount.casualLeave < days) {
        throw new Error(
          'Available Casual Leave ' +
            this.availableLeaveCount.casualLeave +
            ' Days'
        );
      }
    }
    if (type == 'earnedLeave') {
      if (this.availableLeaveCount.earnedLeave < days) {
        throw new Error(
          'Available Earned Leave ' +
            this.availableLeaveCount.earnedLeave +
            ' Days'
        );
      }
    }
  }

  

  leaveForm() {
    let userStr = localStorage.getItem('LOGGED_IN_USER');
    let user = userStr != null ? JSON.parse(userStr) : null;
    console.log('Name : ', user);

    try {
      let from = new Date(this.fromDate);
      let to = new Date(this.toDate);
      let difference = to.getTime() - from.getTime();
      let days = difference / (1000 * 3600 * 24) + 1;
      let daysTaken =
        this.isLeaveAvailableService.isOfficialHolidaysBetweenLeaveDays(
          this.fromDate,
          this.toDate,
          days
        );
      this.validatorService.isEmpty(
        this.user[0].empId,
        "Employee ID can't be empty"
      );
      this.validatorService.isEmpty(this.fromDate, "From Date can't be empty");
      this.validatorService.isEmpty(this.toDate, "To Date can't be empty");
      this.validatorService.isEmpty(this.type, "LeaveType can't be empty");
      this.validatorService.isEmpty(this.reason, "Reason can't be empty");
      this.validatorService.isValidLeaveDays(this.fromDate, this.toDate);
      this.getLeaveAvailability(this.type, daysTaken);
      const leaveFormObj = {
        name: user[0].name,
        employeeId: user[0].empId,
        role: user[0].role,
        fromDate: this.fromDate,
        toDate: this.toDate,
        days: daysTaken,
        leaveType: this.type,
        reason: this.reason,
        status: 'Pending',
        remarks: '',
      };
      const leaveObject = new Leave();
      leaveObject.setData(leaveFormObj);
      console.log(leaveFormObj);
      this.leaveFormService.applyLeave(leaveObject).subscribe(
        (res: any) => {
          let data = res;
          console.log('response : ', data);
          this.toastr.success('Applied Succesfully');
          console.log('success');
          window.location.href = '/history';
        },
        (err: any) => {
          console.error('failed' + err);
          this.toastr.error('Error -');
        }
      );
    } catch (err) {
      console.log(err.message + err);
      this.toastr.error(err.message);
    }
  }
}
