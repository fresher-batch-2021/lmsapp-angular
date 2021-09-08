import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Availableleave } from '../availableleave';
import { LeaveAvailabilityService } from '../leave-availability.service';
import { User } from '../user';

@Component({
  selector: 'app-availableleave',
  templateUrl: './availableleave.component.html',
  styleUrls: ['./availableleave.component.css']
})
export class AvailableleaveComponent implements OnInit {
  user:User;
  forms!:Availableleave[];
  constructor(private leaveAvailabilityService: LeaveAvailabilityService, private tosatr: ToastrService) { 
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    this.user = userStr != null ? JSON.parse(userStr) : null;
    console.log("Name : ", this.user._id);
    
    leaveAvailabilityService.getLeaveAvailability().subscribe((res:any) => {
      let data = res;
      console.log("response : ", data);
      this.forms = data.rows.map((Obj:any)=> Obj.doc);
      console.log("table list :", this.forms);
    },(err:any) => {
      console.log(" failed Get availableLeave :" + err);
      tosatr.error("Error-Can't Load");
    });
  }

  ngOnInit(): void {
    console.log("Available Leave");
  }

}
