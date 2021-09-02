import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InterceptorsService {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     
    const basicAuth = "Basic " + btoa(environment.dbUsername + ":" + environment.dbPassword);

    const url = environment.baseUrl;
      
    request = request.clone({
        setHeaders: {
                Authorization: `${basicAuth}`
        }
    });
    return next.handle(request);
  }
}
