import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LeaveFormService {

  constructor() { }
  dbUsername = "apikey-v2-112mfjkmfy0vbc1cwfx61kckru87k40qr1lnztxypzbg";
  dbPassword = "28cadd4e1a6e2edf67df43007bae28dc";
  basicAuth = "Basic " + btoa(this.dbUsername + ":" + this.dbPassword);
  url = "https://9c34f728-220d-4b98-91c8-b24ae354ff67-bluemix.cloudantnosqldb.appdomain.cloud/leaveforms";

  applyLeave(leaveFormObj: { name: any; id: any; employeeId: any; fromDate: any; toDate: any; leaveType: any; reason: any; status: string; }){
    return axios.post(this.url, leaveFormObj, { headers: { 'Authorization': this.basicAuth } })
  }
}
