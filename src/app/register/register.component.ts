import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user-service';
import { ValidatorService } from '../validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log("Register");
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
      const userService = new UserService();

      const checkIsExists = {
        "selector" : {
          "$or": [
              { "empId": this.empId },
              {"email": this.emailAddress}
          ]
      },
        "fields": ['empId','email']
      }
      userService.checkAlreadyExists(checkIsExists).then(res => {
        let response = res.data;
        console.log(JSON.stringify(response));
        console.log("length : ", res.data.docs.length);
        if (res.data.docs.length == 0) {
          let formData = {
            name: this.name,
            empId: this.empId,
            role: this.role,
            mobileNumber: this.mobileNumber,
            email: this.emailAddress,
            password: this.password,
            status: "Waiting"
          }
          userService.registration(formData).then(res1 => {
            let data = res1.data;
            this.registerID = res1.data.id;
            console.log("RegisterId : ", this.registerID);
            console.log("response : ", data);
            this.toastr.success("Registered Successffully... Your Registration in Progress");
            window.location.href = "/login";
          }).catch(err => {
            console.log(err.data);
            alert("Error - unable to Register");
          });
        } else if(JSON.stringify(response).includes('"email":"'+this.emailAddress+'"')){
          this.toastr.warning("Email Already Exists");
        } else{
          this.toastr.warning("Employee ID already Exists");
        }
      })
    } catch (error) {
      this.toastr.warning(error.message);
    }
  }
}
