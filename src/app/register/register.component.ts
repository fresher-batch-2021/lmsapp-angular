import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../user';
import { UserService } from '../user-service';
import { ValidatorService } from '../validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private toastr: ToastrService,
            private userService: UserService,
            private validatorService: ValidatorService) { }

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
      this.validatorService.isEmpty(this.name, "Name can't be empty");
      this.validatorService.isEmpty(this.empId, "Employee Id can't be empty");
      this.validatorService.isEmpty(this.role, "Role can't be empty");
      this.validatorService.isEmpty(this.mobileNumber, "Mobile Number can't be empty");
      this.validatorService.isEmpty(this.emailAddress, "Email ID can't be empty");
      this.validatorService.isEmpty(this.password, "Password can't be empty");
      this.validatorService.isValidString(this.name, "Enter Valid Name");
      this.validatorService.isVaildEmployeeId(this.empId, "Enter valid Employee ID");
      this.validatorService.isValidMobileNumber(this.mobileNumber, "Enter valid Mobile Number");
      this.validatorService.isValidEmail(this.emailAddress, "Enter valid Email adderss");
      this.validatorService.isValidPassword(this.password, "Password must be 8 characters and contains Atleast 1 Number, 1 Upper Case, 1 Lower Case");

      const checkIsExists = {
        "selector" : {
          "$or": [
              { "empId": this.empId },
              {"email": this.emailAddress}
          ]
      },
        "fields": ['empId','email']
      }
      this.userService.checkAlreadyExists(checkIsExists).subscribe((res:any) => {
        let response = res.docs;
        console.log(JSON.stringify(response));
        console.log("length : ", res.docs.length);
        if (res.docs.length == 0) {
          let formData = {
            name: this.name,
            empId: this.empId,
            role: this.role,
            mobileNumber: this.mobileNumber,
            email: this.emailAddress,
            password: this.password,
            status: "Waiting"
          }
          const user = new User();
          user.setData(formData);
          this.userService.registration(user).subscribe(( res1:any) => {
            let data = res1;
            console.log("response : ", data);
            this.toastr.success("Registered Successffully... Your Registration in Progress");
            window.location.href = "/login";
          },err => {
            console.log(err.data);
            this.toastr.error("Error - unable to Register");
          });
        } else if(JSON.stringify(response).includes('"email":"'+this.emailAddress+'"')){
          this.toastr.warning("Email Already Exists");
        } else{
          this.toastr.warning("Employee ID already Exists");
        }
      })
    } catch (error:any) {
      this.toastr.warning(error.message);
    }
  }
}
