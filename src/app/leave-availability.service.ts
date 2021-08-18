import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LeaveAvailabilityService {

  constructor() { }
  dbUsername = "apikey-v2-112mfjkmfy0vbc1cwfx61kckru87k40qr1lnztxypzbg";
  dbPassword = "28cadd4e1a6e2edf67df43007bae28dc";
  basicAuth = "Basic " + btoa(this.dbUsername + ":" + this.dbPassword);
  url = "https://9c34f728-220d-4b98-91c8-b24ae354ff67-bluemix.cloudantnosqldb.appdomain.cloud/leave-availability";

  addLeaveAvailability(data: {total: number; sickLeave: number; casualLeave: number; earnedLeave: number; empId: string; email: string; }){
    return axios.post(this.url, data, { headers: { 'Authorization': this.basicAuth } })
  }

  getLeaveAvailability(){
    return axios.get(this.url+"/_all_docs?include_docs=true", { headers: { 'Authorization': this.basicAuth } })
  }

  getOneLeaveAvailability(data: { selector: { empId: any; }; fields: string[]; }){
    return axios.post(this.url+"/_find", data, { headers: { 'Authorization': this.basicAuth } })
  }

  updateLeaveAvailability(data: { id: any; total: any; sickLeave: any; casualLeave: any; earnedLeave: any; empId: any; email: any; },rev: any,id: any){
    return axios.put(this.url+"/"+id+"?rev="+rev, data, { headers: { 'Authorization': this.basicAuth } })
  }
}
