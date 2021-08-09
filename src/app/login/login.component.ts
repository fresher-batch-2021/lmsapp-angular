import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  username:string = "";
  password:string = "";
  role:string = "";
  login(){
    console.log("user :",this.username);
    console.log("pass :",this.password);
    console.log("role :",this.role);
    window.location.href = "/home";
  }
}
