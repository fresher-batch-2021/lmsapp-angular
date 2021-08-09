import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applyleave',
  templateUrl: './applyleave.component.html',
  styleUrls: ['./applyleave.component.css']
})
export class ApplyleaveComponent implements OnInit {

  fromDate : any;
  toDate : any;

  constructor() 
  {
    this.fromDate = new Date();
    console.log(this.fromDate)
  }

  
  ngOnInit(): void {
  }

  leaveForm(){
    console.log("renis");
    alert("button clicked");
  }

}
