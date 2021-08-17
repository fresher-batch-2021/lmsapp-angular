import { Component, OnInit } from '@angular/core';
import { LeaveFormService } from '../leave-form.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
    forms : any;
    empId : any;
  constructor() {
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    let user = userStr != null ? JSON.parse(userStr):null;
    this.empId = user[0].empid;
    const serviceObj = new LeaveFormService();
    serviceObj.listLeave().then(res => {
        let data = res.data;
        console.log("response : ", data);
        this.forms = data.rows;
        console.log("table list :", this.forms);
        console.log("available list :");
        console.log("success");
    }).catch(err => {
        //let errorMessage = err.response.data.errorMessage;
        //console.error(errorMessage);
        console.log("failed");
        alert("Error-Can't Load");
    });
   }

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
leaveform(sno : number)
{
    console.log("sno", sno);
    window.location.href = "history/editleaveform?val="+sno;
}

}
