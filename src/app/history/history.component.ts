import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  historyDetails = [
    {
        sno : 1,
        date : "09-08-2021",
        type : "Casual Leave",
        reason : "Function",
        status : "Pending"
    },
    {
        sno : 2,
        date : "02-08-2021",
        type : "Sick Leave",
        reason : "Fever",
        status : "Approved"
    },
    {
        sno : 3,
        date : "26-07-2021",
        type : "Casual Leave",
        reason : "Personal",
        status : "Approved"
    },
    {
        sno : 4,
        date : "08-07-2021",
        type : "Casual Leave",
        reason : "birthday Party",
        status : "Declined"
    },
];

}
