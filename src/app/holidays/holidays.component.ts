import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AvailabilityCheckService } from '../availability-check.service';
import { HolidayService } from '../holiday.service';
import { ValidatorService } from '../validator.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {
  leaveDate: any;
  leaveDescription: any;
  constructor(private toastr: ToastrService,
    private validatorService: ValidatorService,
    private holidayService: HolidayService,
    private availabityCheckService : AvailabilityCheckService) {
      this.leaveDate = availabityCheckService.currentDate();
  }

  ngOnInit(): void {
    console.log("Holiday");
  }
  
  addLeave() {
    try {
      console.log(this.leaveDate);
      console.log(this.leaveDescription);
      this.validatorService.isEmpty(this.leaveDate,"Leave date can't be Empty");
      this.validatorService.isEmpty(this.leaveDescription, "Leave Description can't be Empty");
      let date = new Date(this.leaveDate);
      let dateRef = date.getDay();
      let day;
      if (dateRef == 0) {
        day = "Sunday";
      } else if (dateRef == 1) {
        day = "Monday";
      } else if (dateRef == 2) {
        day = "Tuesday";
      } else if (dateRef == 3) {
        day = "Wednesday"
      } else if (dateRef == 4) {
        day = "Thursday";
      } else if (dateRef == 5) {
        day = "Friday";
      } else if (dateRef == 6) {
        day = "Saturday";
      }
      const leaveData = {
        'date': this.leaveDate,
        'day': day,
        'status': this.leaveDescription
      }
  
      this.holidayService.addHoliday(leaveData).subscribe((res:any) => {
        console.log("Leave Added : " + res);
        this.toastr.success("Leave Added Successfully");
        window.location.href = "/holidays";
      },(err:any) => {
        this.toastr.error("Failed to Add");
      })
    } catch (err:any) {
      this.toastr.warning(err.message);
    }
  }

}
