import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hrmheader',
  templateUrl: './hrmheader.component.html',
  styleUrls: ['./hrmheader.component.css']
})
export class HrmheaderComponent implements OnInit {
  user:any;
  constructor() { 
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    this.user = userStr != null ? JSON.parse(userStr):null;
  }

  ngOnInit(): void {
    console.log("Header");
  }

}
