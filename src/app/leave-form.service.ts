import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LeaveFormService {

  
  dbUsername = "apikey-v2-112mfjkmfy0vbc1cwfx61kckru87k40qr1lnztxypzbg";
  dbPassword = "28cadd4e1a6e2edf67df43007bae28dc";
  basicAuth = "Basic " + btoa(this.dbUsername + ":" + this.dbPassword);
  url = "https://9c34f728-220d-4b98-91c8-b24ae354ff67-bluemix.cloudantnosqldb.appdomain.cloud/leaveforms";

  applyLeave(leaveFormObj: { name: any; employeeId: any; role: any; fromDate: any; toDate: any; days: any; leaveType: any; reason: any; status: string; remarks: string; }){
    return axios.post(this.url, leaveFormObj, { headers: { 'Authorization': this.basicAuth } })
  }

  listLeave(){
    return axios.get(this.url+"/_all_docs?include_docs=true", { headers: { 'Authorization': this.basicAuth } })
  }

  updateLeaveStatus(data: { name: any; employeeId: any; role: any; days: any; fromDate: any; toDate: any; leaveType: any; reason: any; status: any; remarks: string | null; },_id: any,_rev: any){
    console.log("_ID :" , _id);
    console.log("_REV :" , _rev);
    return axios.put(this.url+"/"+_id+"?rev="+_rev ,data, { headers: { 'Authorization': this.basicAuth } })
  }

  deleteLeave(id: string, rev: string){
    return axios.delete(this.url+"/"+id+"?rev="+rev , { headers: { 'Authorization': this.basicAuth } })
  }
}
