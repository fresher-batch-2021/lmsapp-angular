import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor() { }
  dbUsername:string = "apikey-v2-112mfjkmfy0vbc1cwfx61kckru87k40qr1lnztxypzbg";
  dbPassword = "28cadd4e1a6e2edf67df43007bae28dc";
  basicAuth = "Basic " + btoa(this.dbUsername + ":" + this.dbPassword);
  url = "https://9c34f728-220d-4b98-91c8-b24ae354ff67-bluemix.cloudantnosqldb.appdomain.cloud/holidays";

  listHolidays(){
    return axios.get(this.url+"/_all_docs?include_docs=true", { headers: {'Authorization': this.basicAuth }})
  }

  addHoliday(data: any){
    return axios.post(this.url, data, { headers: {'Authorization': this.basicAuth }})
  }
}
