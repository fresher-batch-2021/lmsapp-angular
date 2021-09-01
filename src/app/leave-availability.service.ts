import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveAvailabilityService {

  constructor(private restService: RestService){}
  collectionName:string = "leave-availability";  
  addLeaveAvailability(data: {total: number; sickLeave: number; casualLeave: number; earnedLeave: number; empId: string; email: string; }){
    return this.restService.save(this.collectionName, data)
  }

  getLeaveAvailability(){
    return this.restService.getAllData(this.collectionName+"/_all_docs?include_docs=true")
  }

  getOneLeaveAvailability(data: { selector: { empId: any; }; fields: string[]; }){
    return this.restService.select(this.collectionName+"/_find", data)
  }

  updateLeaveAvailability(data: { id: any; total: any; sickLeave: any; casualLeave: any; earnedLeave: any; empId: any; email: any; },rev: any,id: any){
    return this.restService.updateData(this.collectionName+"/"+id+"?rev="+rev, data)
  }
}
