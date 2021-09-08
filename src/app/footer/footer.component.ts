import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  user:User;
  constructor() {
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    this.user = userStr != null ? JSON.parse(userStr):null;
   }

  ngOnInit(): void {
    console.log("Footer");
  }

}
