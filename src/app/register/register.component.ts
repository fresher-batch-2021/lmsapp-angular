import { Component, OnInit } from '@angular/core';
import { LeaveAnalysisComponent } from '../leave-analysis/leave-analysis.component';
import { LeaveAvailabilityService } from '../leave-availability.service';
import { UserService } from '../user-service';
import { ValidatorService } from '../validator.service';

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
  registerID: string = "";
  register() {
    console.log(this.name);
    console.log(this.empId);
    console.log(this.role);
    console.log(this.mobileNumber);
    console.log(this.emailAddress);
    console.log(this.password);
    try {
      const validatorService = new ValidatorService();
      validatorService.isEmpty(this.name, "Name can't be empty");
      validatorService.isEmpty(this.empId, "Employee Id can't be empty");
      validatorService.isEmpty(this.role, "Role can't be empty");
      validatorService.isEmpty(this.mobileNumber, "Mobile Number can't be empty");
      validatorService.isEmpty(this.emailAddress, "Email ID can't be empty");
      validatorService.isEmpty(this.password, "Password can't be empty");
      validatorService.isValidString(this.name, "Enter Valid Name");
      validatorService.isVaildEmployeeId(this.empId, "Enter valid Employee ID");
      validatorService.isValidMobileNumber(this.mobileNumber, "Enter valid Mobile Number");
      validatorService.isValidEmail(this.emailAddress, "Enter valid Email adderss");
      validatorService.isValidPassword(this.password, "Password must be 8 characters and contains Atleast 1 Number, 1 Upper Case, 1 Lower Case");

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
      }).catch(err => {
        //let errorMessage = err.response.data.errorMessage;
        //console.error(errorMessage);
        alert("Error - unable to Register");
      });

      let data = {
        total: 18,
        sickLeave: 6,
        casualLeave: 6,
        earnedLeave: 6,
        empId: this.empId,
        email: this.emailAddress
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
    } catch (error) {
      alert(error.message);
    }

  }
}
