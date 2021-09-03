import { Injectable } from '@angular/core';
import { Leave } from './leave';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveFormService {
  collectionName:string = "leaveforms";
  constructor(private restService:RestService){}

  applyLeave(leaveFormObj:Leave){
    return this.restService.save(this.collectionName, leaveFormObj)
  }

  listLeave(){
    return this.restService.getAllData(this.collectionName+"/_all_docs?include_docs=true")
  }

  updateLeaveStatus(data:Leave,_id: string,_rev: string){
    return this.restService.updateData(this.collectionName+"/"+_id+"?rev="+_rev, data)
  }

  deleteLeave(id: string, rev: string){
    return this.restService.deleteOneData(this.collectionName+"/"+id+"?rev="+rev)
  }
}
