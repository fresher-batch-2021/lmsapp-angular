import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  constructor() { this.fun();}

  ngOnInit(): void {
  }

  leaveCounts = localStorage.getItem("availableLeave");
  availableLeave:any = this.leaveCounts != null ? JSON.parse(this.leaveCounts):null;
    
  
  fun(){
    console.log(this.availableLeave);
  }
}
