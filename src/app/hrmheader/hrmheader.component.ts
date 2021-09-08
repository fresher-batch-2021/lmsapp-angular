import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-hrmheader',
  templateUrl: './hrmheader.component.html',
  styleUrls: ['./hrmheader.component.css']
})
export class HrmheaderComponent implements OnInit {
  user:User;
  constructor(private route : ActivatedRoute,
    private router: Router) { 
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    this.user = userStr != null ? JSON.parse(userStr):null;
  }

  ngOnInit(): void {
    console.log("Header");
    //console.log("active route", this.route.snapshot.url[0].path);
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
