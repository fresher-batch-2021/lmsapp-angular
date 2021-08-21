import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { 
  }
  dbUsername:string = "apikey-v2-112mfjkmfy0vbc1cwfx61kckru87k40qr1lnztxypzbg";
  dbPassword = "28cadd4e1a6e2edf67df43007bae28dc";
  basicAuth = "Basic " + btoa(this.dbUsername + ":" + this.dbPassword);
  url = "https://9c34f728-220d-4b98-91c8-b24ae354ff67-bluemix.cloudantnosqldb.appdomain.cloud/lms-users";

  registration(formData: { name: string; empId: string; role: string; mobileNumber: string; email: string; password: string; }){
    console.log(formData);
    return axios.post(this.url, formData, { headers: {'Authorization': this.basicAuth }})
  }

  login(formData: { selector: { email: string; password: string; }; fields: string[]; }){
    console.log(formData);
    return axios.post(this.url+"/_find", formData, { headers: {'Authorization': this.basicAuth }})
  }

  listUsers(){
    return axios.get(this.url+"/_all_docs?include_docs=true", { headers: {'Authorization': this.basicAuth }})
  }

  updateUser(id: string,rev: string,data: { name: any; empId: any; role: any; mobileNumber: any; email: any; password: any; status: any; }){
    return axios.put(this.url+"/"+id+"?rev="+rev, data, { headers: {'Authorization': this.basicAuth }})
  }
}
