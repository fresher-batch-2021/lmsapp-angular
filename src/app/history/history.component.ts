import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LeaveFormService } from '../leave-form.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
    forms : any;
    empId : any;
  constructor(private toastr: ToastrService) {
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    let user = userStr != null ? JSON.parse(userStr):null;
    this.empId = user[0].empId;
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
        console.log(err.data);
        alert("Error-Can't Load");
    });
   }

  ngOnInit(): void {
  }

leaveform(id : string, rev : string)
{
    const leaveFormService = new LeaveFormService();
    leaveFormService.deleteLeave(id,rev).then(res => {
        console.log(res.data);
        this.toastr.success("Leave Application Removed");
        window.location.reload();
    }).catch(err => {
        console.log(err.data);
        this.toastr.error("Failed");
    })
}
downloadForm(id:string){
    window.location.href = "/download?val="+id;
}

}
