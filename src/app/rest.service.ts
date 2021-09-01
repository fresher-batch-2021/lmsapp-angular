import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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

  save(url:string, formData:any){
    return this.http.post(this.baseUrl + url, formData, { headers: {'Authorization': this.basicAuth }})
  }

  select(url:string, formData:any){
    return this.http.post(this.baseUrl + url, formData, { headers: {'Authorization': this.basicAuth }})
  }

  getOneData(url:string, formData:any){
    return this.http.get( this.baseUrl + url + "/" + formData, { headers: {'Authorization': this.basicAuth }})
  }

  getAllData(url:string){
    return this.http.get( this.baseUrl + url, { headers: {'Authorization': this.basicAuth }});
  }

  updateData(url:string, formData:any){
    return this.http.put( this.baseUrl + url, formData, { headers: {'Authorization': this.basicAuth }})
  }

  deleteOneData(url:string){
    return this.http.delete( this.baseUrl + url, { headers: {'Authorization': this.basicAuth }})
  }

}
