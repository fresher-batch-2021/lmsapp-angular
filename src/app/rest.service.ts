import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { environment } from 'src/environments/environment';
import { Availableleave } from './availableleave';
import { Holiday } from './holiday';
import { Leave } from './leave';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  basicAuth:string;
  baseUrl :string;
  constructor(private http:HttpClient) { 
    this.basicAuth = "Basic " + btoa(environment.dbUsername + ":" + environment.dbPassword);
    this.baseUrl = environment.baseUrl;
  }
 
  save(url:string, formData:Availableleave | Leave | User | Holiday){
    return this.http.post(this.baseUrl + url, formData)
  }

  select(url:string, formData:any){
    return this.http.post(this.baseUrl + url, formData)
  }

  getOneData(url:string, formData:string){
    return this.http.get( this.baseUrl + url + "/" + formData)
  }

  getAllData(url:string){
    return this.http.get( this.baseUrl + url);
  }

  updateData(url:string, formData:Availableleave | Leave | User | Holiday){
    return this.http.put( this.baseUrl + url, formData)
  }

  deleteOneData(url:string){
    return this.http.delete( this.baseUrl + url)
  }

}