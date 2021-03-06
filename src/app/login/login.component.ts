
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  username!: string;
  password!: string;
  role!: string;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private userService: UserService,
    private validatorService: ValidatorService,
    private router: Router) {
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
      this.validatorService.isEmpty(this.username, "Username Can't be empty");
      this.validatorService.isEmpty(this.password, "Password Can't be empty");
      this.validatorService.isEmpty(this.role, "Role Can't be empty");

      let formData = {
        selector: {
          email: this.username,
          password: this.password
        },
      };

      this.userService.login(formData).subscribe((res: any) => {
        let data = res;
        console.log(data);
        try{
          if (data.docs[0].role != "hr" && data.docs[0].status === "Accepted") {
            localStorage.setItem("LOGGED_IN_USER", JSON.stringify(data.docs[0]));
            this.toastr.success("Welcome " + data.docs[0].name);
            this.router.navigate(["user"]);

          } else if (data.docs[0].role === "hr" && this.role === "HR") {
            localStorage.setItem("LOGGED_IN_USER", JSON.stringify(data.docs[0]));
            this.toastr.success("Welcome " + data.docs[0].name);
            this.router.navigate(["admin"]);

          } else if (data.docs[0].status === "Waiting") {
            this.toastr.info("Your Registration in Progress.. Please Wait");

          } else if (data.docs[0].status === "Declined") {
            this.toastr.info("Your Registration was Declined By HR Team ");

          }  else {
            this.toastr.warning("Invalid Role defined")
          }
        }catch(err){
          this.toastr.error("Invalid Credentials");
        }
      }, (err: { data: any; }) => {
        console.log(err);
        this.toastr.error("Server Error... Try again");
      });
    } catch (err:any) {
      this.toastr.warning(err.message);
    }
  }
}