import { Component, OnInit } from '@angular/core';
import { LeaveFormService } from '../leave-form.service';

@Component({
  selector: 'app-sort-leave-form',
  templateUrl: './sort-leave-form.component.html',
  styleUrls: ['./sort-leave-form.component.css']
})
export class SortLeaveFormComponent implements OnInit {
  array: any;
  forms: any;
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

  isDateBetweenTwoDates(from: any, to: any, key: any) {

    let fromDate = from[1] +'/'+ from[0] + '/' +from[2];
    let toDate = to[1] + '/' + to[0] + '/' + to[2];  
    let keyDate = key[1] + '/' + key[0] + '/' + key[2];
    console.log(fromDate,toDate,keyDate);
    let fDate = Date.parse(fromDate);
    let lDate = Date.parse(toDate);
    let kDate = Date.parse(keyDate);
    console.log(fDate,lDate,kDate);
    if ((kDate <= lDate && kDate >= fDate)) {
      return true;
    }
    return false;
  }

  leaveType: any;
  date: any;
  filter() {
    this.array = [];
    for (let form of this.forms) {
      console.log(form);
      if (form.doc.leaveType == this.leaveType) {
        console.log("form : " + form.doc.fromDate);
        let fromDateArray = form.doc.fromDate.split('-');
        let toDateArray = form.doc.toDate.split('-');
        let todayArray = this.date.split('-');
        fromDateArray.reverse();
        toDateArray.reverse();
        todayArray.reverse();
        
        if (this.isDateBetweenTwoDates(fromDateArray,toDateArray,todayArray)) {
          const result = {
            name: form.doc.name,
            employeeId: form.doc.employeeId,
            fromDate: form.doc.fromDate,
            toDate: form.doc.toDate,
            leaveType: form.doc.leaveType,
            reason: form.doc.reason,
            status: form.doc.status
          }
          this.array.push(result);
        }
      }
    }
    console.log("Array : " + this.array[0].fromDate);
  }
}
