import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-applyleave',
  templateUrl: './applyleave.component.html',
  styleUrls: ['./applyleave.component.css']
})
export class ApplyleaveComponent implements OnInit {



  constructor() {
  }


  ngOnInit(): void {
  }
  userStr: any = localStorage.getItem("LOGGED_IN_USER");
  user: any = this.userStr != null ? JSON.parse(this.userStr) : null;
  employeeId: any;
  fromDate: any;
  toDate: any;
  type: any;
  reason: any;

  leaveForm() {
    console.log("renis");
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    let user = userStr != null ? JSON.parse(userStr) : null;
    console.log("Name : ", user[0]._id);
    const userId = user[0]._id;
    const leaveFormObj = {
      "name": user[0].name,
      "id": userId,
      "employeeId": user[0].empId,
      "fromDate": this.fromDate,
      "toDate": this.toDate,
      "leaveType": this.type,
      "reason": this.reason,
      "status": "Pending"
    }
    let allFieldsAreOk = 0;
    if (this.employeeId == null || this.employeeId.trim() == "") {
      alert("Enter Employee ID");
    }
    else if (this.fromDate == null || this.fromDate.trim() == "") {
      alert("Enter From Date");
    }
    else if (this.toDate == null || this.toDate.trim() == "") {
      alert("Enter To date");
    }
    else if (this.type == null || this.type.trim() == "") {
      alert("Enter Leave type");
    }
    else if (this.reason == null || this.reason.trim() == "") {
      alert("Enter Reason");
    }
    else {
      allFieldsAreOk = 1;
      console.log("All fields are done");
    }
    if (allFieldsAreOk == 1) {
      const dbUsername = "apikey-v2-112mfjkmfy0vbc1cwfx61kckru87k40qr1lnztxypzbg";
      const dbPassword = "28cadd4e1a6e2edf67df43007bae28dc";
      const basicAuth = "Basic " + btoa(dbUsername + ":" + dbPassword);
      let url = "https://9c34f728-220d-4b98-91c8-b24ae354ff67-bluemix.cloudantnosqldb.appdomain.cloud/leaveforms";

      axios.post(url, leaveFormObj, { headers: { 'Authorization': basicAuth } }).then(res => {
        let data = res.data;
        console.log("response : ", data);
        alert("Applied Succesfully");
        console.log("success");
        window.location.href = "/history";
      }).catch(err => {
        //let errorMessage = err.response.data.errorMessage;
        //console.error(errorMessage);
        console.log("failed");
        alert("Error - ");
      });
    }

  }

}
