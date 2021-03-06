import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() {
    localStorage.clear();
    window.location.href = "/login";
   }

  ngOnInit(): void {
    console.log("Logout");
  }
}
