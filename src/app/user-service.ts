import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import {User} from './user'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = "lms-users"
  constructor(private restService:RestService){
    
  }
  //registration(formData: { name: string; empId: string; role: string; mobileNumber: string; email: string; password: string; }){
    registration(formData:User){
    return this.restService.save(this.collectionName , formData);
  }


  login(formData: { selector: { email: string; password: string; }; }){
    return this.restService.select(this.collectionName + "/_find", formData)
  }

  listUsers(){
    return this.restService.getAllData(this.collectionName+"/_all_docs?include_docs=true");
  }

  updateUser(id: string,rev: string,data: User){
    return this.restService.updateData(this.collectionName+"/"+id+"?rev="+rev, data)
  }

  deleteUser(id: string, rev: string){
    return this.restService.deleteOneData(this.collectionName+"/"+id+"?rev="+rev)
  }

  checkAlreadyExists(formData: { selector: { email: string; } | { $or: ({ empId: string; email?: undefined; } | { email: string; empId?: undefined; })[]; }; fields: string[]; }){
    return this.restService.select(this.collectionName + "/_find", formData)
  }

  checkEmpIdAlreadyExists(data: { selector: { empId: string; }; fields: string[]; }){
    return this.restService.select(this.collectionName + "/_find", data)
  }
}
