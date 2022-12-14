import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../model/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:5000/auth/"

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false)
  userId!: Pick<User, "id">

  httpOptions:{headers: HttpHeaders}={
    headers: new HttpHeaders({"Content-Type": "application/json"})
  }

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService, private router: Router) { }

  signup(user: Omit<User, "id">): Observable<User>{
    return this.http.post<User>(`${this.url}/signup`, user, this.httpOptions).pipe(
      first(),//returns first response
      catchError(this.errorHandlerService.handleError<User>("signup"))
    )
  }

  login(email: Pick<User, "email">,password: Pick<User, "password">): Observable<{token: string; userid: Pick<User, "id">}>{
    return this.http.
    post(`${this.url}/login`, { email, password }, this.httpOptions)
    .pipe(
      first(Object),
      tap((tokenObject:{token: string; userid: Pick<User, "id">})=>{
        this.userId=tokenObject.userid;
        localStorage.setItem("token", tokenObject.token);
        this.isUserLoggedIn$.next(true);
        this.router.navigate(["dashboard"])
      }),
      catchError(this.errorHandlerService.handleError<{token: string; userid: Pick<User, "id">}>("login"))
    )
  }

}
