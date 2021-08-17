import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming-leave',
  templateUrl: './upcoming-leave.component.html',
  styleUrls: ['./upcoming-leave.component.css']
})
export class UpcomingLeaveComponent implements OnInit {

  constructor() {
    let array = [
      {
        date: "2021-01-01",
        day: "Friday",
        status: "New year Day"
      },
      {
        date: "2021-01-15",
        day: "FridayFriday",
        status: "Friday"
      },
      {
        date: "2021-01-26",
        day: "Tuesday",
        status: "Republic Day"
      },
      {
        date: "2021-01-28",
        day: "Thursday",
        status: "Thaipusam"
      },
      {
        date: "2021-04-02",
        day: "Friday",
        status: "Good Friday"
      },
      {
        date: "2021-04-14",
        day: "Wednesday",
        status: "Tamil Puthandu"
      },
      {
        date: "2021-04-21",
        day: "Wednesday",
        status: "Rama Navami"
      },
      {
        date: "2021-04-25",
        day: "Sunday",
        status: "Mahavir Jayanti"
      },
      {
        date: "2021-05-01",
        day: "Saturday",
        status: "Labour Day"
      },
      {
        date: "2021-05-14",
        day: "Friday",
        status: "Ramzan"
      },
      {
        date: "2021-06-21",
        day: "Wednesday",
        status: "Bakrid"
      },
      {
        date: "2021-08-15",
        day: "Sunday",
        status: "Independance Day"
      },
      {
        date: "2021-08-20",
        day: "Friday",
        status: "Muharram"
      },
      {
        date: "2021-08-30",
        day: "Monday",
        status: "Krishna Jayanthi"
      },
      {
        date: "2021-09-10",
        day: "Friday",
        status: "Vinayakar Chathurthi"
      },
      {
        date: "2021-10-02",
        day: "Saturday",
        status: "Gandhi Jayanthi"
      },
      {
        date: "2021-10-14",
        day: "Thursday",
        status: "Ayutha Pooja"
      },
      {
        date: "2021-10-15",
        day: "Friday",
        status: "Vijaya Dasami"
      },
      {
        date: "2021-10-19",
        day: "Tuesday",
        status: "Milad-un-Nabi"
      },
      {
        date: "2021-11-04",
        day: "Thursday",
        status: "Deepavali"
      },
      {
        date: "2021-12-25",
        day: "Saturday",
        status: "Christmas"
      }
    ];
  }

  ngOnInit(): void {
  }
  month:string = "";

  currentMonth(){
    
  }
}
