import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveFormService {
  collectionName:string = "leaveforms";
  constructor(private restService:RestService){}

  applyLeave(leaveFormObj: { name: any; employeeId: any; role: any; fromDate: any; toDate: any; days: any; leaveType: any; reason: any; status: string; remarks: string; }){
    return this.restService.save(this.collectionName, leaveFormObj)
  }

  listLeave(){
    return this.restService.getAllData(this.collectionName+"/_all_docs?include_docs=true")
  }

  updateLeaveStatus(data: { name: any; employeeId: any; role: any; days: any; fromDate: any; toDate: any; leaveType: any; reason: any; status: any; remarks: string | null; },_id: any,_rev: any){
    return this.restService.updateData(this.collectionName+"/"+_id+"?rev="+_rev, data)
  }

  deleteLeave(id: string, rev: string){
    return this.restService.deleteOneData(this.collectionName+"/"+id+"?rev="+rev)
  }
}
