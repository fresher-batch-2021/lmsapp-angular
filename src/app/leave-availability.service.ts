import { Injectable } from '@angular/core';
import { Availableleave } from './availableleave';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveAvailabilityService {

  constructor(private restService: RestService){}
  collectionName:string = "leave-availability"; 
   
  addLeaveAvailability(data:Availableleave){
    return this.restService.save(this.collectionName, data)
  }

  getLeaveAvailability(){
    return this.restService.getAllData(this.collectionName+"/_all_docs?include_docs=true")
  }

  getOneLeaveAvailability(data: { selector: { empId: any; }; fields: string[]; }){
    return this.restService.select(this.collectionName+"/_find", data)
  }

  updateLeaveAvailability(data:Availableleave,rev: any,id: any){
    return this.restService.updateData(this.collectionName+"/"+id+"?rev="+rev, data)
  }
}
