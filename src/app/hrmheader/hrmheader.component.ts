import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Leave } from '../leave';
import { PendingleaveService } from '../pendingleave.service';
import { User } from '../user';

@Component({
  selector: 'app-hrmheader',
  templateUrl: './hrmheader.component.html',
  styleUrls: ['./hrmheader.component.css']
})
export class HrmheaderComponent implements OnInit {
  user:User;
  pendingCount : Observable<any>;
  constructor(private router: Router,
    private pendingLeaveService: PendingleaveService) { 
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    this.user = userStr != null ? JSON.parse(userStr):null;
    this.pendingCount = this.pendingLeaveService.pendingLeaveCount;
    console.log("pending count :: "+this.pendingCount);
  }

  ngOnInit(): void {
    console.log("Header");
  }
  home(){
    this.router.navigateByUrl("admin");
  }
  leavePage(){
    this.router.navigateByUrl("admin/hrpage");
  }
  sortLeave(){
    this.router.navigateByUrl("admin/sortforms");
  }
  userRequest(){
    this.router.navigateByUrl("admin/userRequest");
  }
  users(){
    this.router.navigateByUrl("admin/users");
  }
  holidays(){
    this.router.navigateByUrl("admin/holidays");
  }
  leaveAnalysis(){
    this.router.navigateByUrl("admin/leaveAnalysis");
  }
}
