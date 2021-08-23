import { Component, OnInit } from '@angular/core';
import { LeaveFormService } from '../leave-form.service';

@Component({
  selector: 'app-leave-analysis',
  templateUrl: './leave-analysis.component.html',
  styleUrls: ['./leave-analysis.component.css']
})
export class LeaveAnalysisComponent implements OnInit {
  leaveForms: any;
  constructor() {
    
  }

  ngOnInit(): void {
    this.loadDatas();
  }

  loadDatas(){
    const leaveFormService = new LeaveFormService();
    leaveFormService.listLeave().then(res => {
      console.log(res.data);
      this.leaveForms = res.data.rows;
      this.buildDataSets();
    }).catch(err => {
      console.log("Failed to Load Leave Days");
    })
  }

  buildDataSets(){
    let uxTeam = 0;
    let fsTeam = 0;
    let beTeam = 0;
    let dbTeam = 0;
    let adminTeam = 0;
    
    for(let forms of this.leaveForms){
      if(forms.doc.role == "UI/UX" && forms.doc.status == "Approved"){
        uxTeam++;
      }else if(forms.doc.role == "Backend Dev" && forms.doc.status == "Approved"){
        beTeam++;
      }else if(forms.doc.role == "FullStack Dev" && forms.doc.status == "Approved"){
        fsTeam++;
      }else if(forms.doc.role == "Data Administration" && forms.doc.status == "Approved"){
        dbTeam++;
      }else if(forms.doc.role == "Admin" && forms.doc.status == "Approved"){
        adminTeam++;
      }
    }
    console.log("UI/UX : "+uxTeam);
    console.log("Backend : "+beTeam);
    console.log("FullStack : "+fsTeam);
    console.log("DB Team : "+dbTeam);
    console.log("Admin : "+adminTeam);
  }

}
