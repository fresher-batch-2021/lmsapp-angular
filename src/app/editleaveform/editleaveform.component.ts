import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaveFormService } from '../leave-form.service';

@Component({
  selector: 'app-editleaveform',
  templateUrl: './editleaveform.component.html',
  styleUrls: ['./editleaveform.component.css']
})
export class EditleaveformComponent implements OnInit {

  serialNo : any;
  forms:any;
  constructor() 
  {
    const queryString= window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('val');
    this.serialNo = id;
    console.log("ID : ",id);
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
        alert("Error-Unable to retrive");
    });
   }
   
  ngOnInit(): void {
  }
   historyDetails = [
    {
        sno: 1,
        fromDate: "2021-08-12",
        toDate: "2021-08-12",
        type: "Casual Leave",
        reason: "Function",
        status: "Pending"
    },
    {
        sno: 2,
        fromDate: "2021-08-02",
        toDate: "2021-08-02",
        type: "Sick Leave",
        reason: "Fever",
        status: "Approved"
    },
    {
        sno: 3,
        fromDate: "2021-07-26",
        toDate: "2021-07-27",
        type: "Casual Leave",
        reason: "Personal",
        status: "Approved"
    },
    {
        sno: 4,
        fromDate: "2021-07-08",
        toDate: "2021-07-08",
        type: "Casual Leave",
        reason: "birthday Party",
        status: "Declined"
    },
];

}
