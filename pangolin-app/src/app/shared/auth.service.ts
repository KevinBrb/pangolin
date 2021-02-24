import { Injectable } from '@angular/core';
import { Pangolin } from './pangolin';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'http://localhost:5555/v1';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Sign-up
  signUp(user: Pangolin): Observable<any> {
    let api = `${this.endpoint}/register`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  update(id: any, pangolin: Pangolin) {
    return this.http.put<any>(`${this.endpoint}/my-account/update/${id}`, pangolin).pipe(
      catchError(this.handleError)
    )
  }

  updateFriend(friend: any) {
    return this.http.put<any>(`${this.endpoint}/update/friend`, friend).pipe(
      catchError(this.handleError)
    );
  }

  deleteFriend(friend: any) {
    return this.http.put<any>(`${this.endpoint}/delete/friend`, friend).pipe(
      catchError(this.handleError)
    );
  }

  // Sign-in
  signIn(pangolin: Pangolin) {
    return this.http.post<any>(`${this.endpoint}/login`, pangolin)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.getUserProfile(res._id).subscribe((res) => {
          console.log(res)
          localStorage.setItem('currentUser', JSON.stringify(res));
          this.router.navigate(['pangolins']);
        });    
      })
  }

  getMyAccount(id: any) {
    return this.http.get(`${this.endpoint}/my-account`, {
      params: {
        id: id
      },
      observe: 'response'
    });
  }
  
  getAccount(id: any) {
    return this.http.get(`${this.endpoint}/pangolins/${id}`);
  }

  getAll() {
    return this.http.get(`${this.endpoint}`);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['signin']);
    }
  }

  getUserProfile(id: number): Observable<any> {
    let api = `${this.endpoint}/pangolins/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      console.log(error)
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    return throwError(msg);
  }
}
