import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Leave } from '../leave';
import { LeaveFormService } from '../leave-form.service';

@Component({
  selector: 'app-download-form',
  templateUrl: './download-form.component.html',
  styleUrls: ['./download-form.component.css']
})
export class DownloadFormComponent implements OnInit {
  serialNo!: string | null;
  leaveForms!: Leave;
  constructor(private leaveFormService : LeaveFormService,
    private route: ActivatedRoute) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const id = this.route.parent?.snapshot.params["id"];;
    this.serialNo = id;
    console.log("ID : ", id);
    leaveFormService.listLeave().subscribe((res:any) => {
      let data = res;
      this.leaveForms = data.rows.map((obj:any)=>obj.doc);
      console.log("response - leave : ", this.leaveForms);
      console.log("success");
      this.downloadCsvFile(this.leaveForms);
    },(er:any) => {
      console.log(er);
      alert("Error-Unable to retrive");
    });

  }

  ngOnInit(): void {
    console.log("DownloadForm");
  }
  downloadCsvFile(leave: any) {

    let csv = 'Ren-Sys Corporation\n\n';
    csv += "Leave Application\n\n";
    console.log(leave);
    for (let leaveDetail of leave) {
      if (this.serialNo == leaveDetail._id) {
        csv += "EMPID" + ',' + leaveDetail.employeeId;
        csv += "\n";
        csv += "From Date" + ',' + leaveDetail.fromDate;
        csv += "\n";
        csv += "To Date" + ',' + leaveDetail.toDate;
        csv += "\n";
        csv += "Leave Type" + ',' + leaveDetail.leaveType;
        csv += "\n";
        csv += "Reason" + ',' + leaveDetail.reason;
        csv += "\n";
        csv += "Status" + ',' + leaveDetail.status;
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
