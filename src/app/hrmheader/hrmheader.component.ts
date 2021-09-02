import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hrmheader',
  templateUrl: './hrmheader.component.html',
  styleUrls: ['./hrmheader.component.css']
})
export class HrmheaderComponent implements OnInit {
  user:any;
  constructor(private route : ActivatedRoute) { 
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    this.user = userStr != null ? JSON.parse(userStr):null;
  }

  ngOnInit(): void {
    console.log("Header");
    console.log("active route", this.route.snapshot.url[0].path);
  }

}
