import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HolidayService } from '../holiday.service';

@Component({
  selector: 'app-upcoming-leave',
  templateUrl: './upcoming-leave.component.html',
  styleUrls: ['./upcoming-leave.component.css']
})
export class UpcomingLeaveComponent implements OnInit {
  array: any;
  user: any;
  constructor(private holidayService: HolidayService,
    private toastr: ToastrService) {
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    this.user = userStr != null ? JSON.parse(userStr) : null;
    holidayService.listHolidays().subscribe((res:any) => {
      let data = res;
      console.log("response : ", data);
      this.array = data.rows;
      console.log("Holidays List :" + this.array);
      this.sortArray();
    }),((err:any) => {
      console.error("Failed to load Holidays : "+err);
      toastr.error("can't load Holiday lists");
    })
  }

  ngOnInit(): void {
    console.log("Upcoming Holidays");
  }
  month: any;
  sortArray(){
    console.log("sortcalled");
    for(let i = 0; i < this.array.length-1; i++){
      for(let j = i + 1; j < this.array.length; j++){
        let day1 = new Date(this.array[i].doc.date);
        let day2 = new Date(this.array[j].doc.date);
        let day1Value = Date.parse(String(day1.getMonth() + 1).padStart(2, '0')+"/"+day1.getDate()+"/"+day1.getFullYear());
        let day2Value = Date.parse(String(day2.getMonth() + 1).padStart(2, '0')+"/"+day2.getDate()+"/"+day2.getFullYear());
        if(day1Value > day2Value){
          let temp = this.array[i];
          this.array[i] = this.array[j];
          this.array[j] = temp;
        }
      }
    }
  }
}
