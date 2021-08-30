import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

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
      let userList = data.rows;
      this.users = userList.filter((obj: any) => obj.doc.status == 'Accepted');
      console.log("table list :", this.users);
      console.log("success");
    }).catch(err => {
      console.log("failed");
      alert("Error-Can't Load");
    });
  }

  deleteOneUser(id: string,rev: string){
    const userService = new UserService();
    userService.deleteUser(id,rev).then(res => {
      console.log("deleted : ",res.data);
      alert("Deleted Successfully");
    }).catch(err =>{
      console.log(err.data);
      alert("Failed to Delete");
    })
  }
}
