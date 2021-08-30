import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HolidayService } from '../holiday.service';
import { ValidatorService } from '../validator.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {
  constructor(private toastr: ToastrService) {
  }

  ngOnInit(): void {
    console.log("Holiday");
  }
  leaveDate: any;
  leaveDescription: any;
  addLeave() {
    try {
      console.log(this.leaveDate);
      console.log(this.leaveDescription);
      const validatorService = new ValidatorService();
      validatorService.isEmpty(this.leaveDate,"Leave date can't be Empty");
      validatorService.isEmpty(this.leaveDescription, "Leave Description can't be Empty");
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
  
      const holidayService = new HolidayService();
      holidayService.addHoliday(leaveData).then(res => {
        console.log("Leave Added : " + res.data);
        this.toastr.success("Leave Added Successfully");
        window.location.href = "/holidays";
      }).catch(err => {
        this.toastr.error("Failed to Add");
      })
    } catch (err) {
      this.toastr.warning(err.message);
    }
  }

}
