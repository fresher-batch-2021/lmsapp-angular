import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  constructor(private restService: RestService){}
  collectionName:string = "holidays"

  listHolidays(){
    return this.restService.getAllData(this.collectionName+"/_all_docs?include_docs=true")
  }

  addHoliday(data: any){
    return this.restService.save(this.collectionName, data);
  }
}
