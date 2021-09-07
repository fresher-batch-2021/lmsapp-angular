import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router){}
  ngOnInit(): void {
    console.log("Header");
  }
  home(){
    this.router.navigateByUrl("user");
  }
  applyLeave(){
    this.router.navigateByUrl("user/applyleave");
  }
  status(){
    this.router.navigateByUrl("user/status");
  }
  history(){
    this.router.navigateByUrl("user/history");
  }
  holiday(){
    this.router.navigateByUrl("user/upcoming");
  }

}
