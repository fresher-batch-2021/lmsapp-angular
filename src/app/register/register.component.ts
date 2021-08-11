import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  name: string = "";
  empId: string = "";
  role: string = "";
  mobileNumber: string = "";
  emailAddress: string = "";
  password: string = "";

  register() {
    console.log(this.name);
    console.log(this.empId);
    console.log(this.role);
    console.log(this.mobileNumber);
    console.log(this.emailAddress);
    console.log(this.password);
    let passCheck = 0;
    let allFieldsAreOk = 0;
    if (this.name == null || this.name == "" || this.name.trim() == "") {
      alert("Enter valid name");
    }
    else if (this.empId == null || this.empId == "" || this.empId.trim() == "") {
      alert("Enter valid Employee ID");
    }
    else if (this.role == null || this.role == "" || this.role.trim() == "") {
      alert("Enter valid Role");
    }
    else if (this.mobileNumber == null || this.mobileNumber == "" || this.mobileNumber.trim() == "") {
      alert("Enter valid Mobile number");
    }
    else if (this.emailAddress == null || this.emailAddress == "" || this.emailAddress.trim() == "") {
      alert("Enter valid Email Address");
    }
    else if (this.password == null || this.password == "" || this.password.trim() == "" || this.password.length > 8 || this.password.length < 8) {
      alert("Must be 8 letters");
    }
    else if (this.password != null) {
      let numCheck = 0;
      let charCheck = 0;
      let capsCheck = 0;
      let i;
      for (i = 0; i < this.password.length; i++) {
        if (this.password[i] >= "A" && this.password[i] <= "Z") {
          capsCheck = 1;
        }
        if (this.password[i] >= "a" && this.password[i] <= "z") {
          charCheck = 1;
        }
        if (parseInt(this.password[i]) >= 0 && parseInt(this.password[i]) <= 9) {
          numCheck = 1;
        }
      }
      if (numCheck == 1 && charCheck == 1 && capsCheck == 1) {
        console.log("password checked");
        passCheck = 1;
      }
      else {
        alert("Password must contains Atleast 1 Number, 1 Upper Case, 1 Lower Case");
      }
    } else {
      allFieldsAreOk = 1;
    }
    if (passCheck == 1) {
      console.log("api called");
      let url = "https://product-mock-api.herokuapp.com/lmsapp/api/v1/auth/register";
      let formData = {
        name: this.name,
        empId: this.empId,
        role: this.role,
        mobileNumber: this.mobileNumber,
        email: this.emailAddress,
        password: this.password
      }
      axios.post(url, formData).then(res => {
        let data = res.data;
        console.log("response : ", data);
        alert("Successffully Registered");
        window.location.href = "/index";
      }).catch(err => {
        let errorMessage = err.response.data.errorMessage;
        console.error(errorMessage);
        alert("Error-" + errorMessage);
      });

    }
  }
}
