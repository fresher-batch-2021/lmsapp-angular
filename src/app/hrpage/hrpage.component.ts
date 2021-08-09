import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hrpage',
  templateUrl: './hrpage.component.html',
  styleUrls: ['./hrpage.component.css']
})
export class HrpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  leaveForms = [
    {
        name: "Renis",
        employeeId: "2855",
        team: "smart App",
        leaveDays: "08/08/2021",
        leaveType: "Sick Leave",
        reason: "Fever",
    },
    {
        name: "Casio",
        employeeId: "1448",
        team: "DataZap",
        leaveDays: "11/08/2021",
        leaveType: "Casual Leave",
        reason: "Function",
    },
];

}
