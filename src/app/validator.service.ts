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

  isValidString(value: string, errorMessage: string){
    let valueArray = value.split("");
    let count = 0;
    for(let c of valueArray){
      if(c >= 'a' && c <= 'z' || c >= 'A' && c <= 'z' || c == ' ')
        count++;
    }
    if(count != valueArray.length){
      throw new Error(errorMessage);
    }
  }

  isVaildEmployeeId(value: string,errorMessage: string ){
    let valueArray = value.split("");
    let count = 0;
    let zeroCount = 0;
    for(let c of valueArray){
      if(parseInt(c) >= 0 && parseInt(c) <= 9){
        count++;
      }
      if(parseInt(c) == 0){
        zeroCount++;
      }
    }
    if(zeroCount == valueArray.length || count != valueArray.length){
      throw new Error(errorMessage);
    }

  }

  isValidPassword(password: string | any[],errorMessage: string | undefined){
      let numCheck = 0;
      let charCheck = 0;
      let capsCheck = 0;
      let strenthCheck = 0;
      let i;
      for (i = 0; i < password.length; i++) {
        if (password[i] >= "A" && password[i] <= "Z") {
          capsCheck = 1;
        }
        if (password[i] >= "a" && password[i] <= "z") {
          charCheck = 1;
        }
        if (parseInt(password[i]) >= 0 && parseInt(password[i]) <= 9) {
          numCheck = 1;
        }
      }
      if(password.length > 8 || password.length < 8){
        strenthCheck = 0;
      }else{
        strenthCheck = 1;
      }
      if (numCheck == 1 && charCheck == 1 && capsCheck == 1) {
        console.log("password checked");
      }else{
        throw new Error(errorMessage);
      }
  }
  isValidMobileNumber(value: string ,errorMessage: string | undefined){
    let strenthCheck = 0;
    let startWithNonZero = 0;
    let startWith = 0;
    let valueArray = value.split("");
    let zeroCount = 0;
    let zeroCountCheck = 0;
    console.log("value : ",valueArray);
    
    for(let c of valueArray){
      if(c == "0"){
        zeroCount++;
      }
    }
    if(value.length == 10){
      strenthCheck = 1;
    } 
    if(valueArray[0] == "0"){
      startWithNonZero = 0;
    }else{
      startWithNonZero = 1;
    }
    if(parseInt(valueArray[0]) > 5 ){
      startWith = 1;
    }
    if(zeroCount <= 6){
      zeroCountCheck = 1;
    }
    if(strenthCheck == 1 && startWithNonZero == 1 && zeroCountCheck == 1 && startWith == 1){
      console.log("valid Password");
    }
    else{
      throw new Error(errorMessage);
    }
  }

  isValidEmail(value: string,error: string){
    let valueArray = value.split("");
    let index = valueArray.indexOf("@");
    let alpha = 0;
    let number = 0;
    let special = 0;
    let others = 0;
    let doubleDot = 0;
    let domainCheck = 0;

    for(let v of valueArray){
      if(v >= 'a' && v <= 'z')
        alpha++;

      else if(v == '.')
        special++;
      
      else if(v == '-')
        special++;
      
      else if(v == '_')
        special++;
      
      else if(v == '#')
        special++;
      
      else if(v == "@")
        special++;
      
      else if(parseInt(v) >= 0 && parseInt(v) <= 9)
        number++;
      
      else
        others++;
    }

    for(let i = 0; i < valueArray.length-1; i++){
      if(valueArray[i] == '.'){
        if(valueArray[i+1] == '.')
          doubleDot++;
      }
    }

    let valueReverse = valueArray.reverse();
    let dotIndex = valueReverse.indexOf(".");
    valueArray.reverse();
    let emailStarts = 0;
    let beforeAt = 0;
    let afterAt = 0;
    if(valueArray[0] >= 'a' && valueArray[0] <= 'z'){
      emailStarts = 1;
    }
    if(valueArray[index-1] >= 'a' && valueArray[index-1] <= 'z'){
      beforeAt = 1;
    }
    if(valueArray[index+1] >= 'a' && valueArray[index+1] <= 'z'){
      afterAt = 1;
    }
    if(dotIndex > 1){
      domainCheck = 1;
    }
    if(others == 0 && emailStarts == 1 && beforeAt == 1 && afterAt == 1 && domainCheck == 1 && doubleDot == 0){
      console.log("valid email");
    }else{
      throw new Error(error);
    }
    
  }

}
