import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Leave } from '../leave';
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
    { data: [ ] }
  ];

  leaveForms!: Leave[];

  ngOnInit(): void {
    this.loadDatas();
  }

  loadDatas() {
    
    this.leaveFormService.listLeave().subscribe((res:any) => {
      console.log(res);
      this.leaveForms = res.rows.map((obj:any)=> obj.doc);
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
      if (forms.role == "UI/UX" && forms.status == "Approved") {
        uxTeam+=forms.days;
      } else if (forms.role == "Backend Dev" && forms.status == "Approved") {
        beTeam+=forms.days;
      } else if (forms.role == "FullStack Dev" && forms.status == "Approved") {
        fsTeam+=forms.days;
      } else if (forms.role == "Data Administration" && forms.status == "Approved") {
        dbTeam+=forms.days;
      } else if (forms.role == "Admin" && forms.status == "Approved") {
        adminTeam+=forms.days;
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