import { Component, OnInit } from '@angular/core';
import { LeaveFormService } from '../leave-form.service';

@Component({
  selector: 'app-download-form',
  templateUrl: './download-form.component.html',
  styleUrls: ['./download-form.component.css']
})
export class DownloadFormComponent implements OnInit {
  serialNo: any;
  leaveForms: any;
  constructor(private leaveFormService : LeaveFormService) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('val');
    this.serialNo = id;
    console.log("ID : ", id);
    leaveFormService.listLeave().subscribe((res:any) => {
      let data = res;
      console.log("response : ", data);
      this.leaveForms = data.rows;
      console.log("response - leave : ", this.leaveForms);
      console.log("table list :", this.leaveForms);
      console.log("available list :");
      console.log("success");
      this.download_csv_file(this.leaveForms);
    }),((er:any) => {
      console.log(er);
      alert("Error-Unable to retrive");
    });

  }

  ngOnInit(): void {
    console.log("DownloadForm");
  }
  download_csv_file(leave: any) {

    let csv = 'Ren-Sys Corporation\n\n';
    csv += "Leave Application\n\n";
    console.log(leave);
    for (let leaveDetail of leave) {
      if (this.serialNo == leaveDetail.doc._id) {
        csv += "EMPID" + ',' + leaveDetail.doc.employeeId;
        csv += "\n";
        csv += "From Date" + ',' + leaveDetail.doc.fromDate;
        csv += "\n";
        csv += "To Date" + ',' + leaveDetail.doc.toDate;
        csv += "\n";
        csv += "Leave Type" + ',' + leaveDetail.doc.leaveType;
        csv += "\n";
        csv += "Reason" + ',' + leaveDetail.doc.reason;
        csv += "\n";
        csv += "Status" + ',' + leaveDetail.doc.status;
      }
    }
    console.log("FILE DATA : ", csv);
    document.write(csv);
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'leaveform.csv';
    hiddenElement.click();
    window.location.href = "/history";
  }
}
