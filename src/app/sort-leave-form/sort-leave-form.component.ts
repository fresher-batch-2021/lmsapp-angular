import { Component, OnInit } from '@angular/core';
import { LeaveFormService } from '../leave-form.service';

@Component({
  selector: 'app-sort-leave-form',
  templateUrl: './sort-leave-form.component.html',
  styleUrls: ['./sort-leave-form.component.css']
})
export class SortLeaveFormComponent implements OnInit {
  array:any;
  forms:any;
  constructor() {
    const leaveFormService = new LeaveFormService();
    leaveFormService.listLeave().then(res => {
      let data = res.data;
      console.log("response : ", data);
      this.forms = data.rows;
      console.log("Leave list :", this.forms);
      console.log("success");
    }).catch(err => {
      //let errorMessage = err.response.data.errorMessage;
      //console.error(errorMessage);
      console.log("failed");
      alert("Error-Can't Load");
    });
   }

  ngOnInit(): void {
  }
  leaveType:any;
  date:any;
  filter(){
    this.array = {}; 
    for(let form of this.forms){
      console.log(form);
      if(form.doc.leaveType == this.leaveType){
        console.log("form : "+form.doc.fromDate);
        const result = {
          fromDate : form.doc.fromDate,
          toDate : form.doc.toDate,
          }
        this.array.push(result);
      }
    }
    console.log("Array : "+this.array);
  }
}
