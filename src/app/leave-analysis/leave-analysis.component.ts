import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { LeaveFormService } from '../leave-form.service';

@Component({
  selector: 'app-leave-analysis',
  templateUrl: './leave-analysis.component.html',
  styleUrls: ['./leave-analysis.component.css']
})
export class LeaveAnalysisComponent implements OnInit {
  constructor(private leaveFormService : LeaveFormService){}
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['UI/UX', 'FullStack', 'Backend', 'Oracle', 'Admin'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  public barChartData: any = [
    { data: [] }
  ];

  leaveForms: any;

  ngOnInit(): void {
    this.loadDatas();
  }

  loadDatas() {
    
    this.leaveFormService.listLeave().subscribe((res:any) => {
      console.log(res);
      this.leaveForms = res.rows;
      this.buildDataSets();
    },(err:any) => {
      console.log(err);
      console.log("Failed to Load Leave Days");
    })
  }

  buildDataSets() {
    let uxTeam = 0;
    let fsTeam = 0;
    let beTeam = 0;
    let dbTeam = 0;
    let adminTeam = 0;

    for (let forms of this.leaveForms) {
      if (forms.doc.role == "UI/UX" && forms.doc.status == "Approved") {
        uxTeam+=parseInt(forms.doc.days);
      } else if (forms.doc.role == "Backend Dev" && forms.doc.status == "Approved") {
        beTeam+=parseInt(forms.doc.days);
      } else if (forms.doc.role == "FullStack Dev" && forms.doc.status == "Approved") {
        fsTeam+=parseInt(forms.doc.days);
      } else if (forms.doc.role == "Data Administration" && forms.doc.status == "Approved") {
        dbTeam+=parseInt(forms.doc.days);
      } else if (forms.doc.role == "Admin" && forms.doc.status == "Approved") {
        adminTeam+=parseInt(forms.doc.days);
      }
    }
    console.log("UI/UX : " + uxTeam);
    console.log("Backend : " + beTeam);
    console.log("FullStack : " + fsTeam);
    console.log("DB Team : " + dbTeam);
    console.log("Admin : " + adminTeam);
    this.barChartData = [{ label: "Leave Days", data: [uxTeam, fsTeam, beTeam, dbTeam, adminTeam] },];
  }
}