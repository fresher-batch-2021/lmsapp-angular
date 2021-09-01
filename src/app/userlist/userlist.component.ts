import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user-service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {
  sort: any;
  users: any;
  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.listUsers().subscribe((res: any) => {
      let data = res;
      let userList = data.rows;
      this.users = userList.filter((obj: any) => obj.doc.status == 'Accepted');
      console.log('table list :', this.users);
    }),
      (err: any) => {
        console.log('failed : ' + err);
        this.toastr.error("Error-Can't Load");
      };
  }

  deleteOneUser(id: string, rev: string) {
    let status = confirm('Sure Want to Delete ?');
    if (status) {
      this.userService.deleteUser(id, rev).subscribe((res: any) => {
        console.log('deleted : ', res);
        this.toastr.success('Deleted Successfully');
      }),
        (err: any) => {
          console.log(err);
          this.toastr.error('Failed to Delete');
        };
    }
  }
}
