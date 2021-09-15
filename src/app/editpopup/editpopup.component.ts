import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Holiday } from '../holiday';
import { DialogData } from '../upcoming-leave/upcoming-leave.component';

@Component({
  selector: 'app-editpopup',
  templateUrl: './editpopup.component.html',
  styleUrls: ['./editpopup.component.css']
})
export class EditpopupComponent implements OnInit {
  @Input()
  holidayList!: Holiday[];
  leaveDate!:string
  leaveDescription!:string
  constructor(
    public dialogRef: MatDialogRef<EditpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.display();
  }
  display(){
    console.log(this.holidayList)
    console.log(this.data)
    this.leaveDate = this.data.day
    this.leaveDescription = this.data.desc
  }
}