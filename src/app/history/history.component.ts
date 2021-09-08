import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Leave } from '../leave';
import { LeaveFormService } from '../leave-form.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
    leaveHistory!: Leave[];
    empId!: string;
    constructor(private toastr: ToastrService,
        private leaveFormService: LeaveFormService,
        private router : Router) {
        let userStr = localStorage.getItem("LOGGED_IN_USER");
        let user = userStr != null ? JSON.parse(userStr) : null;
        this.empId = user.empId;

        leaveFormService.listLeave().subscribe((res:any) => {
            let data = res;
            console.log("response : ", data);
            this.leaveHistory = data.rows.map((obj:any)=>obj.doc);
            console.log("table list :", this.leaveHistory);
            console.log("success");
        },(err:any) => {
            console.log(err);
            alert("Error-Can't Load");
        });
    }

    ngOnInit(): void {
        console.log("");
    }

    leaveform(id: string, rev: string) {
        let status = confirm("Are you sure ?");
        if(status){
            this.leaveFormService.deleteLeave(id, rev).subscribe((res:any) => {
                console.log(res);
                this.toastr.success("Leave Application Removed");
                window.location.reload();
            },(err:any) => {
                console.log(err.data);
                this.toastr.error("Failed");
            })
        }
    }
    downloadForm(id: string) {
        this.router.navigateByUrl("/download?val=" +id);
    }

    getStyle(status :any)
    {
        let statusClr;
        console.log("status", status);
        if(status == "Declined")
        {
            statusClr = "red";
        }
        else if(status == "Approved")
        {
            statusClr = "Green"
        }
        else 
        {
            statusClr = "orange";
        }
        return statusClr;
    }
}
