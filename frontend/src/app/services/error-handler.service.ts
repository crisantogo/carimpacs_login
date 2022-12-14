//Used to handle errors as there are multiple Http requests
import { Injectable } from '@angular/core';

import { Observable, of } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
//if user sign up has error, will return signup failed
  handleError<T>(operation = "operation", result?: T){
    return(error:any): Observable<T>=>{
      console.log(`${operation} failed: ${error.message}`)
      return of(result as T)
    }
  }
}
