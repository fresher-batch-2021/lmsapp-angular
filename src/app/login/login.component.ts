
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user-service';
import { ValidatorService } from '../validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: any;
  password: any;
  role: any;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    })
  }
  ngOnInit(): void {
    console.log("Login");
  }

  login() {
    console.log("user :", this.loginForm.value.username);
    console.log("pass :", this.loginForm.value.password);
    console.log("role :", this.loginForm.value.role);
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.role = this.loginForm.value.role;
    try {
      const validatorService = new ValidatorService();
      validatorService.isEmpty(this.username, "Username Can't be empty");
      validatorService.isEmpty(this.password, "Password Can't be empty");
      validatorService.isEmpty(this.role, "Role Can't be empty");

      let formData = {
        selector: {
          email: this.username,
          password: this.password
        },
        fields: ["_id", "_rev", "name", "email", "role", "empId", "status"]
      };
      const serviceObj = new UserService();
      serviceObj.login(formData).then(res => {
        let data = res.data;
        console.log(data);
        if (data.docs[0].role != "hr" && data.docs[0].status === "Accepted") {
          localStorage.setItem("LOGGED_IN_USER", JSON.stringify(data.docs));
          this.toastr.success("Welcome " + data.docs[0].name);
          window.location.href = "/home";
        } else if (data.docs[0].role === "hr" && this.role === "HR") {
          localStorage.setItem("LOGGED_IN_USER", JSON.stringify(data.docs));
          this.toastr.success("Welcome " + data.docs[0].name);
          window.location.href = "/hrmHome";
        } else if (data.docs[0].status === "Waiting") {
          this.toastr.info("Your Registration in Progress.. Please Wait");
        } else if (data.docs[0].status === "Declined") {
          this.toastr.info("Your Registration was Declined By HR Team ");
        } else {
          this.toastr.warning("Invalid Role defined")
        }
      }).catch(err => {
        console.log(err.data);
        this.toastr.error("Error - Invalid Credentials");
      });
    } catch (err) {
      this.toastr.warning(err.message);
    }
  }
}


