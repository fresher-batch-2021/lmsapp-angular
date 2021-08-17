
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service';

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
      const dbUsername = "apikey-v2-112mfjkmfy0vbc1cwfx61kckru87k40qr1lnztxypzbg";
        const dbPassword = "28cadd4e1a6e2edf67df43007bae28dc";
        const basicAuth = "Basic " + btoa(dbUsername + ":" + dbPassword);
        let url = "https://9c34f728-220d-4b98-91c8-b24ae354ff67-bluemix.cloudantnosqldb.appdomain.cloud/lms-users/_find";
        let formData = {
            selector: {
                email: this.username,
                password: this.password
            },
            fields: ["_id","_rev","name","role", "empId"] 
        };
      const serviceObj = new UserService();
      serviceObj.login(formData).then(res => {
        let data = res.data;
        console.log(data);
        if (data.docs[0].role === "employee" && this.role === "Employee") {
          localStorage.setItem("LOGGED_IN_USER", JSON.stringify(data.docs));
          alert("Successffully Login");
          updateLocal();
          window.location.href = "/home";
        } else if (data.docs[0].role === "hr" && this.role === "HR") {
          localStorage.setItem("LOGGED_IN_USER", JSON.stringify(data.docs));
          alert("Successffully Login");
          alert("Welcome "+data.docs[0].name);
          window.location.href = "/hrmHome";
        } else {
          alert("Invalid Role defined")
        }


      }).catch(err => {
        //let errorMessage = err.response.data.errorMessage;
        //console.error(errorMessage);
        alert("Error - Invalid Credentials");
      });
    }
  }
}
function updateLocal() {
  let availableLeave = [
    {
      casualLeave : 6,
      sickLeave : 6,
      earnedLeave : 6,
      total : 18
    }
  ];
  localStorage.setItem("availableLeave", JSON.stringify(availableLeave));
}

