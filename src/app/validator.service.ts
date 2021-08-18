import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  isEmpty(value: any, errorMessage: any) {
    if (value == null || value.trim() == "" || value == undefined) {
      throw new Error(errorMessage);
    }
  }

}
