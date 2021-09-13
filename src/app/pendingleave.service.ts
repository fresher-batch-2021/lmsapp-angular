import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Leave } from './leave';
import { LeaveFormService } from './leave-form.service';
@Injectable({
  providedIn: 'root'
})
export class PendingleaveService {
  pendingLeaveCount = new BehaviorSubject<any>(this.getPendingLeave());
  
  getPendingLeave(){
    let pendingLeaveStr = localStorage.getItem("CART_ITEMS");
    let pendingObject =  pendingLeaveStr != null ? JSON.parse(pendingLeaveStr) : [];
    return pendingObject
  }
  pendingLeave(){
    console.log("Called");
    this.pendingLeaveCount.next(this.getPendingLeave());
  }
}
