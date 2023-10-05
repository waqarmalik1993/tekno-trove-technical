import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: any;
  _id: any
  currentUser: any
  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!)
    if (currentUser) {
      this._id = currentUser.data._id
    }
  }
  login(formdata: any) {
    return this.http.post<any>(`${environment.apiUrl}/auth`, formdata)
      .pipe(map(user => {
        if (user.status === 'success') {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        } else {
          return user;

        }
      }));
  }
  register(formdata: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/register`, formdata)
  }
  getUser(page: number = 1, pageSize: number = 10): Observable<any> {
    return this.http.get(`${environment.apiUrl}/get-details`)
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    window.location.reload()
  }

}
