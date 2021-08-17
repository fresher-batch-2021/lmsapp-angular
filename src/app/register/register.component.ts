import { Component, OnInit } from '@angular/core';
import { LeaveAnalysisComponent } from '../leave-analysis/leave-analysis.component';
import { LeaveAvailabilityService } from '../leave-availability.service';
import { UserService } from '../user-service';

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
  registerID: string= "";
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
    else if (this.mobileNumber == null || this.mobileNumber == "" || this.mobileNumber.trim() == "" || this.mobileNumber.length > 10 || this.mobileNumber.length < 10) {
      alert("Enter valid Mobile number");
    }
    else if (this.emailAddress == null || this.emailAddress == "" || this.emailAddress.trim() == "") {
      alert("Enter valid Email Address");
    }
    else if (this.password == null || this.password == "" || this.password.trim() == "" || this.password.length > 8 || this.password.length < 8) {
      alert(" Password Must be 8 letters");
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
        alert("Password must be 8 characters and contains Atleast 1 Number, 1 Upper Case, 1 Lower Case");
      }
    } else {
      allFieldsAreOk = 1;
    }
    if (passCheck == 1) {
      console.log("api called");
      
      let formData = {
        name: this.name,
        empId: this.empId,
        role: this.role,
        mobileNumber: this.mobileNumber,
        email: this.emailAddress,
        password: this.password
      }
      
      const obj = new UserService();
      obj.registration(formData).then(res => {
        let data = res.data;
        this.registerID = res.data.id;
        console.log("RegisterId : ", this.registerID);
        console.log("response : ", data);
        alert("Successffully Registered");
        //window.location.href = "/login";
      }).catch(err => {
        //let errorMessage = err.response.data.errorMessage;
        //console.error(errorMessage);
        alert("Error - unable to Register");
      });

      let data = {
        total : 18,
        sickLeave : 6,
        casualLeave : 6,
        earnedLeave : 6,
        empId : this.empId,
        email : this.emailAddress
      }
      const leaveAvailabilityObj = new LeaveAvailabilityService();
      leaveAvailabilityObj.addLeaveAvailability(data).then(res => {
        let data = res.data;
        console.log("response : ", data);
        alert("Leave balance added to your Account");
        window.location.href = "/login";
      }).catch(err => {
        //let errorMessage = err.response.data.errorMessage;
        //console.error(errorMessage);
        alert("Error - unable to Register");
      });

    }
  }
}
