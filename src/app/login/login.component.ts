import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  username: string = "";
  password: string = "";
  role: string = "";
  login() {
    console.log("user :", this.username);
    console.log("pass :", this.password);
    console.log("role :", this.role);
    let allFielsAreOk = 0;
    if (this.username == null || this.username == "" || this.username.trim() == "") {
      alert("Enter valid username");
    }
    else if (this.password == null || this.password == "" || this.password.trim() == "" || this.password.length > 8 || this.password.length < 8) {
      alert("Password Must be 8 letters");
    }

    else if (this.role == null || this.role == "" || this.role.trim() == "") {
      alert("Role is Invalid");
    }
    else {
      allFielsAreOk = 1;
    }
    if (allFielsAreOk == 1) {
      console.log("called");
      let url = "https://product-mock-api.herokuapp.com/lmsapp/api/v1/auth/login";
      let formData = {
        email: this.username,
        password: this.password
      }

      axios.post(url, formData).then(res => {
        let data = res.data;
        console.log(data);
        if (data.role === "employee" && this.role === "Employee") {
          alert("Successffully Login");
          window.location.href = "/home";
        } else if (data.role === "hr" && this.role === "HR") {
          alert("Successffully Login");
          window.location.href = "/hrpage";
        } else {
          alert("Invalid Role defined")
        }


      }).catch(err => {
        let errorMessage = err.response.data.errorMessage;
        console.error(errorMessage);
        alert("Error-" + errorMessage);
      });
    }
  }
}
