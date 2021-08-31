import { Injectable } from '@angular/core';
import { HolidayService } from './holiday.service';
import { LeaveAvailabilityService } from './leave-availability.service';
import { LeaveFormService } from './leave-form.service';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root'
})
export class RestserviceService {

  constructor(private userService: UserService,
    private leaveFormService: LeaveFormService,
    private leaveAvailabilityService: LeaveAvailabilityService,
    private holidayService: HolidayService) {}
  
  save(data: any,tableName: any){
    
  }
}
