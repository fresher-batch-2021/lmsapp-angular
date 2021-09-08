import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Holiday } from '../holiday';
import { HolidayService } from '../holiday.service';
import { User } from '../user';

@Component({
  selector: 'app-upcoming-leave',
  templateUrl: './upcoming-leave.component.html',
  styleUrls: ['./upcoming-leave.component.css']
})
export class UpcomingLeaveComponent implements OnInit {
  holidayList!: Holiday[];
  user: User;
  constructor(private holidayService: HolidayService,
    private toastr: ToastrService) {
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    this.user = userStr != null ? JSON.parse(userStr) : null;
    holidayService.listHolidays().subscribe((res:any) => {
      let data = res.rows;
      console.log("response : ", data);
      this.holidayList = data.map((obj:any) => obj.doc);
      console.log("Holidays List :" + this.holidayList);
      this.sortArray();
    },(err:any) => {
      console.error("Failed to load Holidays : "+err);
      toastr.error("can't load Holiday lists");
    })
  }

  ngOnInit(): void {
    console.log("Upcoming Holidays");
  }
  month!: string;
  sortArray(){
    console.log("sortcalled");
    for(let i = 0; i < this.holidayList.length-1; i++){
      for(let j = i + 1; j < this.holidayList.length; j++){
        let day1 = new Date(this.holidayList[i].date);
        let day2 = new Date(this.holidayList[j].date);
        let day1Value = Date.parse(String(day1.getMonth() + 1).padStart(2, '0')+"/"+day1.getDate()+"/"+day1.getFullYear());
        let day2Value = Date.parse(String(day2.getMonth() + 1).padStart(2, '0')+"/"+day2.getDate()+"/"+day2.getFullYear());
        if(day1Value > day2Value){
          let temp = this.holidayList[i];
          this.holidayList[i] = this.holidayList[j];
          this.holidayList[j] = temp;
        }
      }
    }
  }
}
