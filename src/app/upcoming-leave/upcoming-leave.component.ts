import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../holiday.service';

@Component({
  selector: 'app-upcoming-leave',
  templateUrl: './upcoming-leave.component.html',
  styleUrls: ['./upcoming-leave.component.css']
})
export class UpcomingLeaveComponent implements OnInit {
  array:any;
  constructor() {
      const holidayService = new HolidayService();
      holidayService.listHolidays().then(res =>{
        let data = res.data;
        console.log("response : ", data);
        this.array = data.rows;
        console.log("Holidays List :" + this.array);
      }).catch(err=>{
        alert("can't load Holiday lists");
      })
  }

  ngOnInit(): void {
  }
  month:any;
}
