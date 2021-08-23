import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  constructor() { }
  sort:any;
  users:any;
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    const serviceObj = new UserService();
    serviceObj.listUsers().then(res => {
      let data = res.data;
      console.log("response : ", data);
      this.users = data.rows;
      console.log("table list :", this.users);
      console.log("success");
    }).catch(err => {
      console.log("failed");
      alert("Error-Can't Load");
    });
  }
}
